import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useGallery } from '../../../contexts/GalleryContext';

const HomepageGallerySelector = ({ adminRole }) => {
  const { galleryData, homepageGallery, updateHomepageGallery, refreshGalleryData } = useGallery();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    refreshGalleryData();
  }, [refreshGalleryData]);

  // Initialize selectedIds only once when component mounts or data changes
  useEffect(() => {
    if (!isInitialized && galleryData && galleryData.length > 0) {
      if (homepageGallery && homepageGallery.length > 0) {
        setSelectedIds(homepageGallery.map(item => item.id));
      } else {
        // Fallback to first 8 images if no homepage selection
        setSelectedIds(galleryData.slice(0, 8).map(item => item.id));
      }
      setIsInitialized(true);
    }
  }, [galleryData, homepageGallery, isInitialized]);

  // Debug selectedIds changes
  useEffect(() => {
    console.log('HomepageGallerySelector - selectedIds changed:', selectedIds);
  }, [selectedIds]);

  const handleImageSelect = (imageId) => {
    console.log('HomepageGallerySelector - Clicking image:', imageId);
    console.log('HomepageGallerySelector - Current selectedIds before change:', selectedIds);
    
    setSelectedIds(prev => {
      const isCurrentlySelected = prev.includes(imageId);
      console.log('HomepageGallerySelector - Is currently selected:', isCurrentlySelected);
      
      let newSelection;
      if (isCurrentlySelected) {
        // Always allow deselection, even if at maximum
        newSelection = prev.filter(id => id !== imageId);
        console.log('HomepageGallerySelector - Deselecting, new selection:', newSelection);
      } else if (prev.length < 8) {
        // Allow selection if under maximum
        newSelection = [...prev, imageId];
        console.log('HomepageGallerySelector - Selecting, new selection:', newSelection);
      } else {
        // Only prevent selection if at maximum and trying to add new image
        alert('You can select maximum 8 images for homepage gallery. Please deselect an image first.');
        return prev;
      }
      
      console.log('HomepageGallerySelector - Returning new selection:', newSelection);
      return newSelection;
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      updateHomepageGallery(selectedIds);
      alert('Homepage gallery updated successfully!');
    } catch (error) {
      console.error('Error updating homepage gallery:', error);
      alert('Failed to update homepage gallery. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const defaultSelection = galleryData.slice(0, 8).map(item => item.id);
    setSelectedIds(defaultSelection);
  };

  const getImageUrl = (item) => {
    if (item.media && item.media.length > 0) {
      return item.media[0].url;
    }
    return '/assets/images/no_image.png';
  };

  const getImageAlt = (item) => {
    if (item.media && item.media.length > 0) {
      return item.media[0].altText || item.title;
    }
    return item.title || 'Gallery Image';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Homepage Gallery Selector</h2>
          <p className="text-muted-foreground">
            Choose which photos to display on the homepage gallery section
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              console.log('HomepageGallerySelector - Deselect All clicked');
              setSelectedIds([]);
            }}
            disabled={isLoading || selectedIds.length === 0}
          >
            <Icon name="X" size={16} className="mr-2" />
            Deselect All
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || selectedIds.length === 0}
          >
            <Icon name="Save" size={16} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Selection'}
          </Button>
        </div>
      </div>

      {/* Selection Info */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Image" size={20} className="text-accent" />
              <span className="font-medium text-foreground">
                Selected: {selectedIds.length}/8 images
              </span>
              <span className="text-xs text-muted-foreground">
                (IDs: {selectedIds.join(', ')})
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Click on images to select/deselect them
            </div>
          </div>
          {selectedIds.length === 8 && (
            <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Maximum selection reached - Click on selected images to deselect them
            </div>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">All Gallery Images</h3>
        
        {galleryData.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Image" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Images Found</h3>
            <p className="text-muted-foreground">
              Upload some images in the Gallery Management section first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {galleryData.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('HomepageGallerySelector - Click event triggered for item:', item.id);
                    handleImageSelect(item.id);
                  }}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={getImageUrl(item)}
                      alt={getImageAlt(item)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                    
                    {/* Selection Overlay */}
                    <div className={`absolute inset-0 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-accent/20' 
                        : 'bg-black/0 group-hover:bg-black/20'
                    }`} />
                    
                    {/* Deselection Hint for Selected Images */}
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-background/90 text-foreground text-xs px-2 py-1 rounded-full">
                          Click to deselect
                        </div>
                      </div>
                    )}
                    
                    {/* Selection Checkbox */}
                    <div 
                      className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-accent border-accent text-accent-foreground cursor-pointer hover:bg-accent/80'
                          : 'bg-background/80 border-white text-white group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('HomepageGallerySelector - Checkbox clicked for item:', item.id);
                        handleImageSelect(item.id);
                      }}
                    >
                      {isSelected && <Icon name="Check" size={14} />}
                    </div>
                    
                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Info */}
                  <div className="p-2 bg-background/95">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Section */}
      {selectedIds.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Homepage Preview</h3>
          <div className="bg-muted/30 rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-4">
              This is how your selected images will appear on the homepage:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedIds.slice(0, 8).map((id) => {
                const item = galleryData.find(img => img.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="group relative overflow-hidden rounded-lg">
                    <div className="aspect-square relative">
                      <Image
                        src={getImageUrl(item)}
                        alt={getImageAlt(item)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageGallerySelector;
