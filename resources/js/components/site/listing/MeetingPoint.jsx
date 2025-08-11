import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MeetingPoint = ({ loading, listing }) => {
    const { t } = useTranslation();
    
    if (loading) {
        return (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={30} width={200} className="mb-3" />
                <Skeleton height={60} className="mb-2" />
            </div>
        );
    }

    if (!listing) return null;

    // Only show for Things to Do category (category_id = 5)
    if (listing.category_id !== 5) return null;

    // Check for meeting_point or pickup_info fields
    const meetingPoint = listing.meeting_point || listing.pickup_info;
    
    if (!meetingPoint) return null;

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-primary-600" size={18} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    {t('listing.meetingPoint.title', 'Meeting and Pickup')}
                </h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                    {t('listing.meetingPoint.address', 'Meeting Point Address')}
                </h3>
                <div className="text-gray-800 leading-relaxed">
                    {meetingPoint}
                </div>
            </div>
        </div>
    );
};

export default MeetingPoint;