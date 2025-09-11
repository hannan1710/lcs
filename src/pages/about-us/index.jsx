import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';

const AboutUs = () => {
  const images = ['/thane.png', '/powai.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-muted/20 py-4">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              About La Coiffure Salon
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Luxury hair and beauty services in Thane and Powai. Crafting confidence with artistry, care, and premium experiences.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-10">
          <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, La Coiffure Salon was born from a passion to blend high-fashion styling with warm, personalized service. From a boutique studio to two premium destinations, our journey is rooted in trust, consistency, and innovation.
              </p>
              <p className="text-muted-foreground">
                We believe every guest deserves a tailored experience. Our stylists and beauty experts continuously refine their craft to bring you the latest techniques and premium treatments.
              </p>
            </div>
            {/* Slideshow Container */}
            <div className="rounded-xl overflow-hidden border border-border aspect-[2/3] md:aspect-[16/9] lg:aspect-video relative">
              <Image 
                src={images[currentImageIndex]} 
                alt="Salon" 
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out" 
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
              >
                <Icon name="ChevronLeft" size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
              >
                <Icon name="ChevronRight" size={24} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-10 bg-muted/20">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <Icon name="Scissors" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Craftsmanship</h3>
                <p className="text-muted-foreground">Precision techniques and premium products for consistently beautiful results.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <Icon name="Heart" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Care</h3>
                <p className="text-muted-foreground">A warm, welcoming environment where your comfort comes first.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <Icon name="Lightbulb" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Creativity</h3>
                <p className="text-muted-foreground">Trend-aware artistry tailored to your lifestyle and personality.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <Icon name="Award" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                <p className="text-muted-foreground">Commitment to delivering exceptional service and exceeding expectations.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <Icon name="Rocket" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                <p className="text-muted-foreground">Constantly exploring new techniques and trends to keep your style fresh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Locations CTA */}
        <section className="py-10">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="bg-card rounded-lg border border-border p-8 md:p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Ready for a Transformation?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover our world of luxury hair and beauty. Visit one of our premier locations in Thane or Powai.
              </p>
              <a href="/contact-location" className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-luxury">
                Contact & Locations
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;