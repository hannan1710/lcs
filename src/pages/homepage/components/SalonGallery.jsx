import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { useGallery } from "../../../contexts/GalleryContext";

const SalonGallery = () => {
  const { homepageGallery, refreshGalleryData } = useGallery();

  // Refresh gallery data when component mounts to ensure latest data
  useEffect(() => {
    refreshGalleryData();
  }, [refreshGalleryData]);

  // Get homepage gallery selection - use state directly for reactivity
  const homepageImages = homepageGallery;

  // Transform gallery data to match the expected format
  const galleryImages = (homepageImages || []).map(item => ({
    id: item.id,
    src: item.media?.[0]?.url || "/assets/images/no_image.png",
    alt: item.media?.[0]?.altText || item.title || "Gallery Image",
    category: item.category || "hair",
    title: item.title || "Untitled",
    description: item.description || "",
    tags: item.tags || "",
    featured: item.featured || false
  }));

  // Show selected images for homepage
  const displayedImages = galleryImages?.slice(0, 8);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              "name": "La Coiffure Salon Gallery",
              "description": "Professional hair styling, cutting, and beauty services gallery at La Coiffure Salon",
              "url": window.location.href,
              "image": galleryImages.slice(0, 8).map(img => ({
                "@type": "ImageObject",
                "url": img.src,
                "name": img.title,
                "description": img.alt
              }))
            })
          }}
        />
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our stunning salon space and witness the artistry of our
            work through our curated gallery of transformations.
          </p>
        </div>
      {/* No category filter - removed */}


        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {displayedImages && displayedImages.length > 0 ? displayedImages.map((image, index) => (
            <div
              key={image?.id}
              className={`group relative overflow-hidden rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-luxury cursor-pointer`}
            >
              <div className={`relative h-20 sm:h-32 md:h-48`}>
                  <Image
                    src={image?.src}
                    alt={image?.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content - Always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-heading text-sm font-semibold truncate">
                    {image?.title}
                  </h3>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Icon name="Image" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                No Images Found
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Gallery images are loading. Please check back in a moment.
              </p>
            </div>
          )}
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
              Stay updated with our latest work, behind-the-scenes content, and
              styling tips.
            </p>
            <a
              href="https://instagram.com/lacoiffuresalon"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block" }}
            >
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                iconName="ExternalLink"
                iconPosition="right"
              >
                @lacoiffuresalon
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonGallery;
