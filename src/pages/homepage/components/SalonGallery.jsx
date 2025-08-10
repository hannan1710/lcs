import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SalonGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'Grid3X3' },
    { id: 'salon', name: 'Salon', icon: 'Building' },
    { id: 'hair', name: 'Hair Work', icon: 'Scissors' },
    { id: 'color', name: 'Color', icon: 'Palette' },
    { id: 'bridal', name: 'Bridal', icon: 'Heart' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Luxury salon interior with elegant styling chairs",
      category: "salon",
      title: "Main Styling Floor"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Professional hair cutting and styling session",
      category: "hair",
      title: "Precision Cut"
    },
    {
      id: 3,
      src: "https://images.pixabay.com/photos/2016/03/26/22/13/woman-1281826_960_720.jpg",
      alt: "Beautiful hair color transformation",
      category: "color",
      title: "Color Transformation"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Relaxing facial treatment room",
      category: "salon",
      title: "Treatment Room"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Elegant bridal hair styling",
      category: "bridal",
      title: "Bridal Elegance"
    },
    {
      id: 6,
      src: "https://images.pixabay.com/photos/2017/07/31/11/22/people-2557396_960_720.jpg",
      alt: "Professional hair treatment application",
      category: "hair",
      title: "Keratin Treatment"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Men\'s grooming and styling service",
      category: "hair",
      title: "Men\'s Styling"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Luxury salon reception area",
      category: "salon",
      title: "Reception Area"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Beautiful balayage color work",
      category: "color",
      title: "Balayage Artistry"
    },
    {
      id: 10,
      src: "https://images.pixabay.com/photos/2016/11/19/15/32/woman-1840517_960_720.jpg",
      alt: "Stunning bridal updo hairstyle",
      category: "bridal",
      title: "Bridal Updo"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Modern salon workspace",
      category: "salon",
      title: "Styling Station"
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Creative hair color design",
      category: "color",
      title: "Creative Color"
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages?.filter(img => img?.category === selectedCategory);

  const displayedImages = filteredImages?.slice(0, 8);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our stunning salon space and witness the artistry of our work through our curated gallery of transformations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-luxury ${
                selectedCategory === category?.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span className="font-medium">{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedImages?.map((image, index) => (
            <div
              key={image?.id}
              className={`group relative overflow-hidden rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-luxury cursor-pointer ${
                index === 0 || index === 3 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <div className={`relative ${
                index === 0 || index === 3 ? 'h-64 sm:h-96' : 'h-64'
              }`}>
                <Image
                  src={image?.src}
                  alt={image?.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {image?.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={16} />
                    <span className="text-sm">View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link to="/gallery-portfolio">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View Full Gallery
            </Button>
          </Link>
        </div>

        {/* Instagram Section */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 shadow-luxury border border-border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="Instagram" size={32} className="text-accent" />
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Follow Us on Instagram
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Stay updated with our latest work, behind-the-scenes content, and styling tips.
            </p>
            <Button
              variant="default"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              iconName="ExternalLink"
              iconPosition="right"
            >
              @lacoiffuresalon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonGallery;