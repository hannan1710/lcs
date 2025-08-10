import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageLightbox = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onPrevious, 
  onNext 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e?.key === 'Escape') onClose();
      if (e?.key === 'ArrowLeft') onPrevious();
      if (e?.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !images?.[currentIndex]) return null;

  const currentImage = images?.[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="text-white">
            <h3 className="font-heading text-lg lg:text-xl font-semibold">
              {currentImage?.title}
            </h3>
            <p className="text-sm text-white/80">
              {currentImage?.category} • By {currentImage?.stylist}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-luxury"
            aria-label="Close lightbox"
          >
            <Icon name="X" size={24} color="white" />
          </button>
        </div>
      </div>
      {/* Navigation Arrows */}
      {images?.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-luxury"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size={24} color="white" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-luxury"
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size={24} color="white" />
          </button>
        </>
      )}
      {/* Main Image */}
      <div className="flex items-center justify-center h-full p-4 lg:p-8">
        <div className="relative max-w-4xl max-h-full">
          <Image
            src={currentImage?.image}
            alt={currentImage?.title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          
          {/* Before/After Indicator */}
          {currentImage?.isBeforeAfter && (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">Before & After</span>
            </div>
          )}
        </div>
      </div>
      {/* Bottom Info & Actions */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent">
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="text-white">
              <p className="text-sm lg:text-base mb-2">
                {currentImage?.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span>{currentIndex + 1} of {images?.length}</span>
                {currentImage?.duration && (
                  <span>Duration: {currentImage?.duration}</span>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
                iconName="Share2"
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                iconName="Calendar"
                iconPosition="left"
              >
                Book Similar
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Image Counter Dots */}
      {images?.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
          {images?.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const diff = index - currentIndex;
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext();
                } else if (diff < 0) {
                  for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                }
              }}
              className={`w-2 h-2 rounded-full transition-luxury ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;