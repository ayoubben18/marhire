import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BookingEmailModal from './BookingEmailModal';

const BookingEmailManager: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [bookingId, setBookingId] = useState<number | null>(null);

    useEffect(() => {
        // Listen for email button clicks from jQuery
        const handleEmailButtonClick = (e: CustomEvent) => {
            console.log('Email button clicked, booking ID:', e.detail.bookingId);
            setBookingId(e.detail.bookingId);
            setShowModal(true);
        };

        // Add event listener
        window.addEventListener('openEmailModal' as any, handleEmailButtonClick as any);

        // Expose a function to jQuery to open the modal
        (window as any).openBookingEmailModal = (id: number) => {
            console.log('Opening email modal for booking:', id);
            setBookingId(id);
            setShowModal(true);
        };

        // Cleanup
        return () => {
            window.removeEventListener('openEmailModal' as any, handleEmailButtonClick as any);
            delete (window as any).openBookingEmailModal;
        };
    }, []);

    const handleClose = () => {
        setShowModal(false);
        // Don't clear booking ID immediately to prevent flashing
        setTimeout(() => {
            setBookingId(null);
        }, 300);
    };

    return (
        <>
            {showModal && (
                <BookingEmailModal 
                    bookingId={bookingId} 
                    onClose={handleClose}
                />
            )}
        </>
    );
};

// Function to initialize the component
export const initBookingEmailManager = () => {
    const container = document.getElementById('booking-email-manager');
    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(<BookingEmailManager />);
    }
};

export default BookingEmailManager;