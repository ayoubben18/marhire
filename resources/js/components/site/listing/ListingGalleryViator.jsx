import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SmartImage from '../../SmartImage';

// Helper function to get translated field
const getTranslatedField = (item, field, locale) => {
    if (item?.translated_fields && item.translated_fields[field]) {
        if (item.translated_fields[field][locale]) {
            return item.translated_fields[field][locale];
        }
        if (item.translated_fields[field]['en']) {
            return item.translated_fields[field]['en'];
        }
    }
    return item?.[field] || '';
};

const ListingGalleryViator = ({ images = [], title }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState({});
    const [showAllThumbnails, setShowAllThumbnails] = useState(false);

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
    const handleImageError = (originalPath, imageIndex) => {
        console.warn(`Image failed to load: ${originalPath}`);
        setImageErrors(prev => ({
            ...prev,
            [imageIndex]: true
        }));
    };

    // Open modal
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    // Navigate to previous image
    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    // Navigate to next image
    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    // Navigate main image with arrow keys
    const nextMainImage = () => {
        setMainImageIndex((prev) => 
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevMainImage = () => {
        setMainImageIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isModalOpen) return;
            
            switch (event.key) {
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'Escape':
                    closeModal();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    if (!images || images.length === 0) {
        return (
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-6">
                <p className="text-gray-500">{t('common.no_images_available', 'No images available')}</p>
            </div>
        );
    }

    const mainImage = images[mainImageIndex];
    const visibleThumbnails = showAllThumbnails ? images : images.slice(0, 5);
    const hasMoreImages = images.length > 5;

    return (
        <>
            <div className="mb-6">
                {/* Main image container (full width, 4:3 aspect ratio) */}
                <div className="w-full mb-4">
                    <div 
                        className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] w-full"
                        onClick={() => openModal(mainImageIndex)}
                    >
                        {!imageErrors[mainImageIndex] ? (
                            <SmartImage 
                                src={getImageUrl(mainImage.file_path)}
                                fallbackSrcs={getFallbackImageUrl(mainImage.file_path)}
                                alt={`${title} - Main Image ${mainImageIndex + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={() => handleImageError(mainImage.file_path, mainImageIndex)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">🖼️</div>
                                    <p className="text-gray-500">
                                        {t('common.image_not_available', 'Image not available')}
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {/* Navigation arrows */}
                        {images.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevMainImage();
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                >
                                    <FaChevronLeft size={16} />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextMainImage();
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                >
                                    <FaChevronRight size={16} />
                                </button>
                            </>
                        )}
                        
                        {/* Expand overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                            <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <FaExpand className="text-white" size={24} />
                                <p className="text-white text-sm mt-2 font-medium">
                                    {t('common.click_to_enlarge', 'Click to enlarge')}
                                </p>
                            </div>
                        </div>
                        
                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm pointer-events-none">
                            {mainImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>

                {/* Bottom thumbnails - Horizontal strip */}
                <div className="flex flex-col gap-3">
                    {/* Scrollable thumbnail container */}
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className="flex gap-2 pb-2">
                            {visibleThumbnails.map((image, index) => {
                                const isActive = index === mainImageIndex;
                                const hasError = imageErrors[index];
                                
                                return (
                                    <div 
                                        key={image.id || index}
                                        className={`relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] border-2 transition-all duration-200 flex-shrink-0 w-16 h-12 md:w-20 md:h-15 ${
                                            isActive ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'
                                        }`}
                                        onClick={() => setMainImageIndex(index)}
                                    >
                                        {!hasError ? (
                                            <SmartImage 
                                                src={getImageUrl(image.file_path)}
                                                fallbackSrcs={getFallbackImageUrl(image.file_path)}
                                                alt={`${title} - Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={() => handleImageError(image.file_path, index)}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500 text-xs text-center px-1">
                                                    {t('common.image_error', 'N/A')}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Show More/Less button */}
                    {hasMoreImages && (
                        <div className="flex justify-center">
                            <button 
                                onClick={() => setShowAllThumbnails(!showAllThumbnails)}
                                className="text-sm text-blue-600 hover:text-blue-800 py-2 px-4 border rounded-lg bg-white hover:bg-blue-50 transition-colors"
                            >
                                {showAllThumbnails 
                                    ? t('common.show_less', 'Show Less')
                                    : t('common.see_more', `See More (+${images.length - 5})`)}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-5xl max-h-full">
                        {/* Close button */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        {/* Navigation buttons */}
                        {images.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Current image */}
                        <div className="max-h-screen max-w-full">
                            <SmartImage 
                                src={getImageUrl(images[currentImageIndex]?.file_path)}
                                fallbackSrcs={getFallbackImageUrl(images[currentImageIndex]?.file_path)}
                                alt={`${title} - Image ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListingGalleryViator;