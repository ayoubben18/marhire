import React, { useState, useEffect } from 'react';
import axios from 'axios';

declare const swal: any;

interface EmailStatus {
    booking_received?: {
        sent: boolean;
        date?: string;
        status: string;
        error?: string;
        has_pdf: boolean;
    };
    booking_confirmed?: {
        sent: boolean;
        date?: string;
        status: string;
        error?: string;
        has_pdf: boolean;
    };
    booking_cancelled?: {
        sent: boolean;
        date?: string;
        status: string;
        error?: string;
        has_pdf: boolean;
    };
}

interface BookingEmailModalProps {
    bookingId: number | null;
    onClose: () => void;
}

const BookingEmailModal: React.FC<BookingEmailModalProps> = React.memo(({ bookingId, onClose }) => {
    const [emailStatus, setEmailStatus] = useState<EmailStatus | null>(null);
    const [emailType, setEmailType] = useState('booking_received');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch email status when booking ID changes
    useEffect(() => {
        if (bookingId) {
            fetchEmailStatus();
        }
    }, [bookingId]);

    const fetchEmailStatus = async () => {
        if (!bookingId) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`/bookings/${bookingId}/email-status`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            console.log('Email status fetched:', response.data);
            setEmailStatus(response.data.status);
        } catch (err: any) {
            console.error('Error fetching email status:', err);
            setError('Failed to load email status');
            // Set default status
            setEmailStatus({
                booking_received: { sent: false, status: 'not_sent', has_pdf: false },
                booking_confirmed: { sent: false, status: 'not_sent', has_pdf: false },
                booking_cancelled: { sent: false, status: 'not_sent', has_pdf: false }
            });
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async () => {
        if (!bookingId) {
            alert('Booking ID is missing');
            return;
        }

        if (!confirm('Are you sure you want to send this email?')) {
            return;
        }

        setSending(true);
        setError(null);

        try {
            const response = await axios.post(`/bookings/${bookingId}/send-email`, {
                email_type: emailType,
                _token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            console.log('Email sent successfully:', response.data);
            
            // Show success message with SweetAlert
            swal({
                title: "Success!",
                text: "Email sent successfully",
                icon: "success",
            });

            // Update email status
            if (response.data.history?.status) {
                setEmailStatus(response.data.history.status);
            } else {
                // Refresh status
                await fetchEmailStatus();
            }
        } catch (err: any) {
            console.error('Error sending email:', err);
            let errorMessage = 'An error occurred while sending the email';
            
            if (err.response?.status === 404) {
                errorMessage = 'Route not found. Please refresh the page.';
            } else if (err.response?.status === 401) {
                errorMessage = 'Session expired. Please refresh the page and login again.';
            } else if (err.response?.status === 419) {
                errorMessage = 'Session expired. Please refresh the page.';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            
            swal({
                title: "Error!",
                text: errorMessage,
                icon: "error",
            });
        } finally {
            setSending(false);
        }
    };

    const getStatusBadge = (status: any) => {
        if (!status) {
            return <span className="badge badge-warning">Not Sent</span>;
        }

        if (status.sent) {
            return (
                <span className="badge badge-success">
                    Sent {status.date ? `on ${status.date}` : ''}
                </span>
            );
        } else if (status.status === 'failed') {
            return <span className="badge badge-danger">Failed</span>;
        } else {
            return <span className="badge badge-warning">Not Sent</span>;
        }
    };

    if (!bookingId) return null;

    return (
        <div 
            className="modal fade show" 
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={(e) => {
                // Only close if clicking the backdrop, not the modal content
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div 
                className="modal-dialog" 
                role="document"
                onClick={(e) => e.stopPropagation()}
            >
                <div 
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <a href="#" className="close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}>
                        <em className="icon ni ni-cross"></em>
                    </a>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Send Email - Booking #{String(bookingId).padStart(4, '0')}
                        </h5>
                    </div>
                    <div className="modal-body">
                        {/* Email History Section */}
                        <div className="email-history mb-4">
                            <h6 className="mb-3">Email History</h6>
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-sm">
                                        <tbody>
                                            <tr>
                                                <td>Pending Email:</td>
                                                <td>{getStatusBadge(emailStatus?.booking_received)}</td>
                                            </tr>
                                            <tr>
                                                <td>Confirmed Email:</td>
                                                <td>{getStatusBadge(emailStatus?.booking_confirmed)}</td>
                                            </tr>
                                            <tr>
                                                <td>Cancelled Email:</td>
                                                <td>{getStatusBadge(emailStatus?.booking_cancelled)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        
                        {/* Send Email Section */}
                        <div className="send-email">
                            <h6 className="mb-3">Send Email</h6>
                            <div className="form-group">
                                <select 
                                    className="form-control" 
                                    value={emailType}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setEmailType(e.target.value);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    disabled={sending}
                                >
                                    <option value="booking_received">Pending Notification</option>
                                    <option value="booking_confirmed">Confirmation Email</option>
                                    <option value="booking_cancelled">Cancellation Email</option>
                                </select>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-primary w-100" 
                                onClick={sendEmail}
                                disabled={sending || loading}
                            >
                                {sending ? 'Sending...' : 'Send Email'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // Only re-render if bookingId actually changes
    return prevProps.bookingId === nextProps.bookingId;
});

export default BookingEmailModal;