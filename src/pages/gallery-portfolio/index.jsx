import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import ImageLightbox from './components/ImageLightbox';
import { useGallery } from '../../contexts/GalleryContext';

const GalleryPortfolio = () => {
  const { galleryData } = useGallery();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);

  // Fallback mock gallery data for demo purposes
  const mockGalleryData = [
    {
      id: 1,
      title: 'Elegant Updo',
      category: 'bridal',
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=800&fit=crop',
      description: 'Sophisticated bridal updo with intricate braiding'
    },
    {
      id: 2,
      title: 'Modern Bob',
      category: 'cuts',
      image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=800&fit=crop',
      description: 'Contemporary bob cut with textured layers'
    },
    {
      id: 3,
      title: 'Balayage Highlights',
      category: 'color',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=800&fit=crop',
      description: 'Natural-looking balayage highlights'
    },
    {
      id: 4,
      title: 'Classic French Twist',
      category: 'styling',
      image: 'https://images.unsplash.com/photo-1523263685509-324b17c0c4c0?w=600&h=800&fit=crop',
      description: 'Timeless French twist for formal occasions'
    },
    {
      id: 5,
      title: 'Pixie Cut',
      category: 'cuts',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=800&fit=crop',
      description: 'Edgy pixie cut with texture'
    },
    {
      id: 6,
      title: 'Ombre Color',
      category: 'color',
      image: 'https://images.unsplash.com/photo-1552858725-2758b5fb1288?w=600&h=800&fit=crop',
      description: 'Beautiful ombre color transition'
    },
    {
      id: 7,
      title: 'Bridal Braids',
      category: 'bridal',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop',
      description: 'Romantic bridal braids with flowers'
    },
    {
      id: 8,
      title: 'Beach Waves',
      category: 'styling',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=800&fit=crop',
      description: 'Effortless beach waves styling'
    },
    {
      id: 9,
      title: 'Lob Cut',
      category: 'cuts',
      image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=800&fit=crop',
      description: 'Long bob with face-framing layers'
    }
  ];


  useEffect(() => {
    // Use context data if available, otherwise fall back to mock data
    const dataToUse = galleryData && galleryData.length > 0 ? galleryData : mockGalleryData;
    
    // Transform data to ensure consistent structure for rendering
    const transformedData = dataToUse.map(item => {
      // If item has media array, prioritize images over videos
      if (item.media && item.media.length > 0) {
        const firstImage = item.media.find(media => media.type?.startsWith('image/'));
        const firstVideo = item.media.find(media => media.type?.startsWith('video/'));
        const firstMedia = firstImage || firstVideo || item.media[0];
        
        return {
          ...item,
          image: firstMedia ? firstMedia.url : item.image || '/assets/images/no_image.png',
          mediaType: firstMedia ? firstMedia.type : 'image',
          altText: firstMedia ? firstMedia.altText || item.title : item.title
        };
      }
      // If item already has image property, use it as is
      return {
        ...item,
        image: item.image || '/assets/images/no_image.png',
        mediaType: 'image',
        altText: item.title
      };
    });
    
    setFilteredImages(transformedData);
  }, [galleryData]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {filteredImages.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-luxury hover:shadow-luxury-hover transition-luxury"
                onClick={() => handleImageClick(index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {item.mediaType && item.mediaType.startsWith('video/') ? (
                    <video
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-luxury-slow"
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.altText || item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-luxury-slow"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-luxury" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-luxury">
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Icon name="Eye" size={16} />
                      <span className="text-sm">Click to view</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        images={filteredImages}
        currentIndex={currentImageIndex}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />

      <Footer />
    </div>
  );
};

export default GalleryPortfolio;