import React, { useState, useEffect } from 'react'; 
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import ImageLightbox from './components/ImageLightbox';
import { useGallery } from '../../contexts/GalleryContext';

const GalleryPortfolio = () => {
  const { galleryData, refreshGalleryData } = useGallery();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState([]);

  // Refresh gallery data when component mounts
  useEffect(() => {
    refreshGalleryData();
  }, [refreshGalleryData]);

  // Gallery data is automatically updated from context

  // No mock data - use only real gallery data from context


  useEffect(() => {
    console.log('Gallery Portfolio - Raw galleryData:', galleryData);
    // Use gallery data from context (supports both code-based and admin-uploaded images)
    const dataToUse = galleryData || [];
    console.log('Gallery Portfolio - dataToUse length:', dataToUse.length);
    
    // If no data, try to force refresh
    if (!dataToUse || dataToUse.length === 0) {
      console.log('Gallery Portfolio - No data, refreshing...');
      refreshGalleryData();
    }
    
    // Transform data to ensure consistent structure for rendering
    const transformedData = dataToUse.map((item, index) => {
      console.log(`Gallery Portfolio - Processing item ${index}:`, item);
      // Force all items to be treated as images since we only have image files
      if (item.media && item.media.length > 0) {
        const firstImage = item.media.find(media => media.type?.startsWith('image/'));
        const firstMedia = firstImage || item.media[0];
        console.log(`Gallery Portfolio - First media for item ${index}:`, firstMedia);
        
        const transformedItem = {
          ...item,
          image: firstMedia ? firstMedia.url : item.image || '/assets/images/no_image.png',
          mediaType: 'image', // Force image type
          altText: firstMedia ? firstMedia.altText || item.title || 'Gallery Image' : item.title || 'Gallery Image'
        };
        console.log(`Gallery Portfolio - Transformed item ${index}:`, transformedItem);
        return transformedItem;
      }
      // If item already has image property, use it as is
      const transformedItem = {
        ...item,
        image: item.image || '/assets/images/no_image.png',
        mediaType: 'image', // Force image type
        altText: item.title || 'Gallery Image'
      };
      console.log(`Gallery Portfolio - Transformed item ${index} (no media):`, transformedItem);
      return transformedItem;
    });
    
    console.log('Gallery Portfolio - Final transformedData:', transformedData);
    setDisplayImages(transformedData);
  }, [galleryData, refreshGalleryData]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 border-0">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Image" size={24} className="text-accent" />
              </div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
                Our Portfolio
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Explore our collection of stunning transformations, from elegant bridal styles 
              to modern cuts and vibrant color work. Each image represents our commitment 
              to artistry and excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/appointment-booking'}
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-luxury"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Book Appointment
              </button>
              
              <button
                onClick={() => window.location.href = '/services-catalog'}
                className="inline-flex items-center justify-center px-6 py-3 border border-accent text-accent font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-luxury"
              >
                <Icon name="Scissors" size={20} className="mr-2" />
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery Grid */}
      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-8">
          {displayImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Image" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                No Images Found
              </h3>
              <p className="text-muted-foreground">
                Gallery images are loading. Please check back in a moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              {displayImages.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-luxury hover:shadow-luxury-hover transition-luxury"
                onClick={() => handleImageClick(index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-luxury-slow"
                    onError={(e) => {
                      console.error('Gallery Portfolio - Image failed to load:', item.image, 'Error:', e);
                      e.target.src = '/assets/images/no_image.png';
                    }}
                    onLoad={() => {
                      console.log('Gallery Portfolio - Image loaded successfully:', item.image);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-luxury" />
                  
                  {/* Overlay Content - Always visible at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-heading font-semibold text-sm mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs opacity-90 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold mb-4">
            Ready for Your Own Transformation?
          </h2>
          <p className="text-lg lg:text-xl opacity-90 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Join our portfolio of satisfied clients. Book your appointment today and let our expert stylists create your perfect look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Get Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        images={displayImages}
        currentIndex={currentImageIndex}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />

      <Footer />
    </div>
  );
};

export default GalleryPortfolio;