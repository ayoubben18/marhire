import React, { useState, useEffect } from 'react';

const SmartImage = ({ 
    src, 
    fallbackSrcs = [], 
    alt, 
    onError, 
    loading = 'lazy', 
    style = {}, 
    className = '',
    useNotFoundFallback = true,
    ...props 
}) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [fallbackIndex, setFallbackIndex] = useState(-1);
    const [hasError, setHasError] = useState(false);

    // Reset state when src prop changes
    useEffect(() => {
        setCurrentSrc(src);
        setFallbackIndex(-1);
        setHasError(false);
    }, [src]);

    const handleImageError = () => {
        console.warn(`Image failed to load: ${currentSrc}`);
        
        // Try fallback images if available
        if (fallbackSrcs && fallbackSrcs.length > 0 && fallbackIndex < fallbackSrcs.length - 1) {
            const nextIndex = fallbackIndex + 1;
            setFallbackIndex(nextIndex);
            setCurrentSrc(fallbackSrcs[nextIndex]);
            console.log(`Trying fallback image: ${fallbackSrcs[nextIndex]}`);
        } else if (useNotFoundFallback && currentSrc !== '/images/not-found.png') {
            // Try the not-found.png as final fallback
            console.log('Using not-found.png as final fallback');
            setCurrentSrc('/images/not-found.png');
            setFallbackIndex(fallbackSrcs.length); // Mark as beyond fallbacks
        } else {
            // No more fallbacks available
            setHasError(true);
            if (onError) {
                onError();
            }
        }
    };

    if (hasError) {
        return null; // Let parent component handle error display
    }

    return (
        <img
            src={currentSrc}
            alt={alt}
            onError={handleImageError}
            loading={loading}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default SmartImage;