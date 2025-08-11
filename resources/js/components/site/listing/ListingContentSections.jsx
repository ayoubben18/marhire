import React from 'react';
import {
    ListingOverview,
    BookingTerms,
    ListingPolicies,
    SpecialNotes,
    WhatsIncluded,
    MeetingPoint,
    DealerNote,
    ListingDescription
} from './index';

/**
 * Main component that renders all content sections for a listing page
 * Based on Viator's layout structure (sections 7-14 from progress-tracker.md)
 * 
 * @param {Object} listing - The listing data
 * @param {Object} agency - The agency data (optional)
 * @param {boolean} loading - Loading state
 */
const ListingContentSections = ({ listing, agency, loading }) => {
    return (
        <div className="listing-content-sections">
            {/* Section 7: Overview */}
            <ListingOverview listing={listing} loading={loading} />
            
            {/* Section 8: Booking Terms */}
            <BookingTerms listing={listing} loading={loading} />
            
            {/* Section 9: What's Included */}
            <WhatsIncluded listing={listing} loading={loading} />
            
            {/* Section 10: Meeting Point (only for Things to Do) */}
            <MeetingPoint listing={listing} loading={loading} />
            
            {/* Section 11: Special Notes (if available) */}
            <SpecialNotes listing={listing} loading={loading} />
            
            {/* Section 12: Dealer Note (if available) */}
            <DealerNote listing={listing} agency={agency} loading={loading} />
            
            {/* Section 13: Policies */}
            <ListingPolicies listing={listing} loading={loading} />
            
            {/* Section 14: Full Description */}
            <ListingDescription listing={listing} loading={loading} />
        </div>
    );
};

export default ListingContentSections;