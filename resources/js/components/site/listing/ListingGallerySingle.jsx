import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExpand, FaTimes } from 'react-icons/fa';
import SmartImage from '../../SmartImage';

const ListingGallerySingle = ({ loading, listing }) => {
    const { t } = useTranslation();
    
    // Extract images from listing.galleries and title from listing
    const images = listing?.galleries || [];
    const title = listing?.title || '';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Get proper image URL with leading slash
    const getImageUrl = (filePath) => {
        if (!filePath) return null;
        if (filePath.startsWith('http') || filePath.startsWith('/')) {
            return filePath;
        }
        return `/${filePath}`;
    };

    // Get fallback image URL
    const getFallbackImageUrl = (filePath) => {
        if (!filePath) return null;
        const imageUrl = getImageUrl(filePath);
        if (imageUrl.endsWith('.webp')) {
            const basePath = imageUrl.replace('.webp', '');
            return [`${basePath}.jpg`, `${basePath}.jpeg`, `${basePath}.png`];
        }
        return null;
    };

    // Handle image load error
    const handleImageError = (originalPath) => {
        console.warn(`Image failed to load: ${originalPath}`);
        setImageError(true);
    };

    // Open modal
    const openModal = () => {
        if (!imageError) {
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
        }
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isModalOpen) return;
            
            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // Ensure body overflow is reset on unmount
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    // Loading state
    if (loading) {
        return (
            <div className="mb-6">
                <div className="bg-gray-200 rounded-lg aspect-[4/3] animate-pulse"></div>
            </div>
        );
    }

    if (!images || images.length === 0) {
        return (
            <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center mb-6">
                <div className="text-center">
                    <div className="text-4xl mb-2">🚗</div>
                    <p className="text-gray-500">{t('common.no_image_available', 'No image available')}</p>
                </div>
            </div>
        );
    }

    // For car rentals, show only the first image
    const image = images[0];
    const imagePath = image.file_path || image;

    return (
        <>
            <div className="mb-6">
                <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]">
                    {!imageError ? (
                        <SmartImage 
                            src={getImageUrl(imagePath)}
                            fallbackSrcs={getFallbackImageUrl(imagePath)}
                            alt={title || t('common.car_rental_image', 'Car Rental Image')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onClick={openModal}
                            onError={() => handleImageError(imagePath)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                            <div className="text-4xl mb-2">🚗</div>
                            <p className="text-sm text-center px-4">
                                {t('common.image_not_available', 'Image not available')}
                            </p>
                        </div>
                    )}
                    
                    {/* Hover overlay */}
                    {!imageError && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <FaExpand className="text-white" size={24} />
                                <p className="text-white text-sm mt-2 font-medium">
                                    {t('common.click_to_enlarge', 'Click to enlarge')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && !imageError && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
                        {/* Close button */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Image */}
                        <div className="max-h-screen max-w-full">
                            <SmartImage 
                                src={getImageUrl(imagePath)}
                                fallbackSrcs={getFallbackImageUrl(imagePath)}
                                alt={title || t('common.car_rental_image', 'Car Rental Image')}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Title overlay */}
                        {title && (
                            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 text-white p-3 rounded-lg">
                                <h3 className="font-semibold text-lg">{title}</h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ListingGallerySingle;