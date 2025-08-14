import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PortfolioGrid = ({ images, onImageClick }) => {
  if (!images || images?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Image" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
          No Images Found
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find any images in this category. Please try selecting a different filter.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-8">
      {/* Mobile: Masonry-style layout */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
        {images?.map((image, index) => (
          <div
            key={image?.id}
            className={`relative group cursor-pointer ${
              index % 3 === 0 ? 'row-span-2' : ''
            }`}
            onClick={() => onImageClick(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
              <Image
                src={image?.image}
                alt={image?.title}
                className="w-full h-full object-cover transition-luxury group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-luxury">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium truncate">
                        {image?.title}
                      </p>
                      <p className="text-white/80 text-xs">
                        {image?.category}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="Eye" size={16} color="white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Before/After Badge */}
              {image?.isBeforeAfter && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                  B&A
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Desktop: Organized grid layout */}
      <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images?.map((image, index) => (
          <div
            key={image?.id}
            className="relative group cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
              <Image
                src={image?.image}
                alt={image?.title}
                className="w-full h-full object-cover transition-luxury group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-luxury">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">
                      {image?.title}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {image?.category} • By {image?.stylist}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-white/60 text-xs">
                        {image?.duration}
                      </span>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-luxury">
                          <Icon name="Eye" size={16} color="white" />
                        </div>
                        <div className="w-8 h-8 bg-accent/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-luxury">
                          <Icon name="Calendar" size={16} color="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before/After Badge */}
              {image?.isBeforeAfter && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full shadow-luxury">
                  Before & After
                </div>
              )}

              {/* Featured Badge */}
              {image?.featured && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;