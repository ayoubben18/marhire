import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

declare const swal: any;

interface EmailLog {
    id: number;
    status: string;
    created_at: string;
    recipient_email: string;
    error_message?: string;
    retry_count: number;
    has_pdf: boolean;
}

interface EmailTypeStatus {
    logs: EmailLog[];
    can_retry: boolean;
    can_resend: boolean;
}

interface EmailStatus {
    booking_received?: EmailTypeStatus;
    booking_confirmed?: EmailTypeStatus;
    booking_cancelled?: EmailTypeStatus;
}

interface Booking {
    id: number;
    status: string;
    invoice_no?: string;
    booking_language?: string;
}

interface BookingEmailModalProps {
    bookingId: number | null;
    onClose: () => void;
}

const BookingEmailModal: React.FC<BookingEmailModalProps> = React.memo(({ bookingId, onClose }) => {
    const [emailStatus, setEmailStatus] = useState<EmailStatus | null>(null);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [emailType, setEmailType] = useState('booking_received');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedTypes, setExpandedTypes] = useState<{ [key: string]: boolean }>({});

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
            setEmailStatus(response.data.email_status);
            setBooking(response.data.booking);
        } catch (err: any) {
            console.error('Error fetching email status:', err);
            setError('Failed to load email status');
            // Set default status
            setEmailStatus({
                booking_received: { logs: [], can_retry: false, can_resend: false },
                booking_confirmed: { logs: [], can_retry: false, can_resend: false },
                booking_cancelled: { logs: [], can_retry: false, can_resend: false }
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleExpanded = (type: string) => {
        setExpandedTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const retryEmail = async (emailLogId: number) => {
        if (!bookingId) {
            alert('Booking ID is missing');
            return;
        }

        if (!confirm('Are you sure you want to retry this failed email?')) {
            return;
        }

        setSending(true);
        setError(null);

        try {
            const response = await axios.post(`/bookings/${bookingId}/retry-email`, {
                email_log_id: emailLogId,
                _token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            console.log('Email retry response:', response.data);
            
            // Show success message with SweetAlert
            swal({
                title: response.data.success ? "Success!" : "Failed",
                text: response.data.message,
                icon: response.data.success ? "success" : "error",
            });

            // Update email status
            if (response.data.history?.email_status) {
                setEmailStatus(response.data.history.email_status);
            } else {
                // Refresh status
                await fetchEmailStatus();
            }
        } catch (err: any) {
            console.error('Error retrying email:', err);
            let errorMessage = 'An error occurred while retrying the email';
            let errorTitle = "Error!";
            
            if (err.response?.status === 422 && err.response?.data?.mismatch) {
                // Status mismatch error
                errorTitle = "Status Mismatch!";
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            
            swal({
                title: errorTitle,
                text: errorMessage,
                icon: "error",
            });
        } finally {
            setSending(false);
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
            if (response.data.history?.email_status) {
                setEmailStatus(response.data.history.email_status);
            } else {
                // Refresh status
                await fetchEmailStatus();
            }
        } catch (err: any) {
            console.error('Error sending email:', err);
            let errorMessage = 'An error occurred while sending the email';
            let errorTitle = "Error!";
            
            if (err.response?.status === 404) {
                errorMessage = 'Route not found. Please refresh the page.';
            } else if (err.response?.status === 401) {
                errorMessage = 'Session expired. Please refresh the page and login again.';
            } else if (err.response?.status === 419) {
                errorMessage = 'Session expired. Please refresh the page.';
            } else if (err.response?.status === 422 && err.response?.data?.mismatch) {
                // Status mismatch error
                errorTitle = "Status Mismatch!";
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            
            swal({
                title: errorTitle,
                text: errorMessage,
                icon: "error",
            });
        } finally {
            setSending(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'sent':
                return <span className="badge badge-success">Sent</span>;
            case 'failed':
                return <span className="badge badge-danger">Failed</span>;
            case 'sending':
                return <span className="badge badge-info">Sending</span>;
            default:
                return <span className="badge badge-warning">Not Sent</span>;
        }
    };

    const formatDateTime = (dateStr: string | null) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEmailTypeLabel = (type: string) => {
        switch (type) {
            case 'booking_received':
                return 'Pending Email';
            case 'booking_confirmed':
                return 'Confirmed Email';
            case 'booking_cancelled':
                return 'Cancelled Email';
            default:
                return type;
        }
    };

    const isEmailTypeAllowed = (type: string): boolean => {
        if (!booking) return false;
        
        switch (type) {
            case 'booking_received':
                return booking.status === 'Pending';
            case 'booking_confirmed':
                return booking.status === 'Confirmed';
            case 'booking_cancelled':
                return booking.status === 'Cancelled';
            default:
                return false;
        }
    };

    const renderEmailHistory = (type: string, data: EmailTypeStatus | undefined) => {
        if (!data || data.logs.length === 0) {
            return (
                <tr key={type}>
                    <td style={{ width: '40%' }}><strong>{getEmailTypeLabel(type)}:</strong></td>
                    <td><span className="badge badge-warning">Never Sent</span></td>
                    <td className="text-right"></td>
                </tr>
            );
        }

        const latestLog = data.logs[0];
        const hasMultipleLogs = data.logs.length > 1;
        const isExpanded = expandedTypes[type];

        return (
            <React.Fragment key={type}>
                <tr>
                    <td style={{ width: '40%' }}>
                        <strong>{getEmailTypeLabel(type)}:</strong>
                        {hasMultipleLogs && (
                            <>
                                <button
                                    className="btn btn-sm btn-link p-0 ml-2"
                                    onClick={() => toggleExpanded(type)}
                                    title={isExpanded ? 'Hide history' : 'Show history'}
                                >
                                    <em className={`icon ni ${isExpanded ? 'ni-chevron-up' : 'ni-chevron-down'}`}></em>
                                </button>
                                <small className="text-muted ml-1">({data.logs.length})</small>
                            </>
                        )}
                    </td>
                    <td>
                        {getStatusBadge(latestLog.status)}
                        {latestLog.retry_count > 0 && (
                            <small className="ml-1 text-muted">
                                (Attempt {latestLog.retry_count + 1}/3)
                            </small>
                        )}
                    </td>
                    <td className="text-right">
                        {data.can_retry && (
                            <button
                                className="btn btn-sm btn-warning mr-1"
                                onClick={() => retryEmail(latestLog.id)}
                                disabled={sending}
                            >
                                Retry
                            </button>
                        )}
                        {data.can_resend && (
                            <button
                                className="btn btn-sm btn-info"
                                onClick={() => {
                                    setEmailType(type);
                                    sendEmail();
                                }}
                                disabled={sending}
                            >
                                Resend
                            </button>
                        )}
                    </td>
                </tr>
                {hasMultipleLogs && isExpanded && (
                    <tr>
                        <td colSpan={3}>
                            <div className="bg-light p-2 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <small className="text-muted d-block mb-2">History (newest first):</small>
                                {data.logs.map((log, index) => (
                                    <div key={log.id} className="mb-2 pb-2 border-bottom">
                                        <div className="d-flex justify-content-between">
                                            <small>
                                                <strong>{formatDateTime(log.created_at)}</strong>
                                                {' - '}
                                                {log.recipient_email}
                                                {booking?.booking_language && (
                                                    <span className="badge badge-light ml-2" style={{ fontSize: '10px' }}>
                                                        {booking.booking_language.toUpperCase()}
                                                    </span>
                                                )}
                                            </small>
                                            <div>
                                                {getStatusBadge(log.status)}
                                                {log.has_pdf && (
                                                    <em className="icon ni ni-file-pdf text-danger ml-1" title="PDF attached"></em>
                                                )}
                                            </div>
                                        </div>
                                        {log.error_message && (
                                            <small className="text-danger d-block mt-1">
                                                Error: {log.error_message}
                                            </small>
                                        )}
                                        {log.retry_count > 0 && (
                                            <small className="text-muted">
                                                Retry attempt #{log.retry_count}
                                            </small>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        );
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
                            {booking && (
                                <>
                                    <span className={`badge ml-2 badge-${
                                        booking.status === 'Confirmed' ? 'success' : 
                                        booking.status === 'Cancelled' ? 'danger' : 
                                        'warning'
                                    }`}>
                                        {booking.status}
                                    </span>
                                    {booking.invoice_no && (
                                        <span className="badge badge-info ml-2">
                                            {booking.invoice_no}
                                        </span>
                                    )}
                                    {booking.booking_language && (
                                        <span className="badge badge-secondary ml-2">
                                            <em className="icon ni ni-globe mr-1"></em>
                                            {booking.booking_language.toUpperCase()}
                                        </span>
                                    )}
                                </>
                            )}
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
                                            {renderEmailHistory('booking_received', emailStatus?.booking_received)}
                                            {renderEmailHistory('booking_confirmed', emailStatus?.booking_confirmed)}
                                            {renderEmailHistory('booking_cancelled', emailStatus?.booking_cancelled)}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        
                        {/* Send Email Section */}
                        <div className="send-email">
                            <h6 className="mb-3">Send Email</h6>
                            {booking && !isEmailTypeAllowed(emailType) && (
                                <div className="alert alert-warning mb-3">
                                    <em className="icon ni ni-alert-circle mr-1"></em>
                                    <strong>Warning:</strong> This email type doesn't match the current booking status ({booking.status}). 
                                    Please update the booking status first.
                                </div>
                            )}
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
                                    <option value="booking_received">
                                        Pending Notification {!isEmailTypeAllowed('booking_received') && '(Status must be Pending)'}
                                    </option>
                                    <option value="booking_confirmed">
                                        Confirmation Email {!isEmailTypeAllowed('booking_confirmed') && '(Status must be Confirmed)'}
                                    </option>
                                    <option value="booking_cancelled">
                                        Cancellation Email {!isEmailTypeAllowed('booking_cancelled') && '(Status must be Cancelled)'}
                                    </option>
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