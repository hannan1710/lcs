
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useService } from '../../../contexts/ServiceContext';

const FeaturedServices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { services: contextServices, refreshServices } = useService();

  // Filter only featured services
  const services = contextServices?.filter(service => service.featured === true) || [];

  // Debug services loading
  useEffect(() => {
    console.log('FeaturedServices - contextServices:', contextServices);
    console.log('FeaturedServices - featured services:', services);
    console.log('FeaturedServices - total services:', contextServices?.length || 0);
    console.log('FeaturedServices - featured services count:', services.length);
  }, [contextServices, services]);

  // Refresh services when component mounts
  useEffect(() => {
    console.log('FeaturedServices - Refreshing services...');
    refreshServices();
  }, [refreshServices]);

  // Transform service data to match expected format
  const transformService = useCallback((service) => ({
    id: service.id,
    name: service.name || 'Service',
    description: service.description || 'Professional service',
    image: service.image || '/assets/images/no_image.png',
    duration: service.duration ? (service.duration.includes('min') ? service.duration : `${service.duration} min`) : '60 min',
    category: service.category === 'other' ? 'Hair' : (service.category || 'Hair')
  }), []);

  const transformedServices = useMemo(() => 
    services?.map(transformService) || [], 
    [services, transformService]
  );

  const nextSlide = useCallback(() => {
    const maxSlides = Math.ceil(transformedServices?.length / 4);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  }, [transformedServices?.length]);

  const prevSlide = useCallback(() => {
    const maxSlides = Math.ceil(transformedServices?.length / 4);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  }, [transformedServices?.length]);

  const getVisibleServices = useCallback(() => {
    const startIndex = currentSlide * 4;
    return transformedServices?.slice(startIndex, startIndex + 4);
  }, [currentSlide, transformedServices]);

  // Show fallback if no services
  if (!transformedServices || transformedServices.length === 0) {
    // Check if we're in admin mode
    const isAdmin = localStorage.getItem('admin');
    
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
              Featured Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {isAdmin 
                ? 'No featured services available yet. Please mark some services as featured through the admin panel.'
                : 'Featured services are being loaded. Please check back in a moment.'
              }
            </p>
            {isAdmin && (
              <div className="flex gap-4 justify-center">
                <Link to="/admin">
                  <Button variant="outline">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Manage Featured Services
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.log('Manual refresh triggered');
                    refreshServices();
                    // Force re-render
                    window.location.reload();
                  }}
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Refresh Services
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.log('Resetting to sample services');
                    localStorage.removeItem('salon_services_data');
                    window.location.reload();
                  }}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Reset to Sample Services
                </Button>
              </div>
            )}
            {!isAdmin && (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-muted-foreground">Loading services...</span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Featured Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our signature treatments designed to enhance your natural beauty with the finest techniques and premium products.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {transformedServices?.map((service) => (
                  <div key={service?.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-card rounded-lg shadow-luxury overflow-hidden border border-border">
                      <div className="relative h-24 overflow-hidden">
                        <Image
                          src={service?.image}
                          alt={service?.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                            {service?.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                          {service?.name}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                          {service?.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-accent">
                              {/* Removed starting price */}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {service?.duration}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        >
                          More info
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: services?.length })?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-luxury ${
                      index === currentSlide ? 'bg-accent' : 'bg-muted'
                    }`}
                    style={{
                      width: "6px",
                      height: "6px",
                      minWidth: "6px",
                      minHeight: "6px"
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {getVisibleServices()?.map((service) => (
                <div key={service?.id} className="bg-card rounded-2xl shadow-luxury overflow-hidden border border-border hover:shadow-luxury-hover transition-luxury">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service?.image}
                      alt={service?.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {service?.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                      {service?.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {service?.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {/* Removed starting price */}
                        <span className="text-xs text-muted-foreground">
                          {service?.duration}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      fullWidth
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      More info
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Navigation */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronLeft" size={24} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(services?.length / 4) })?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-luxury ${
                      index === currentSlide ? 'bg-accent' : 'bg-muted'
                    }`}
                    style={{
                      width: "6px",
                      height: "6px",
                      minWidth: "6px",
                      minHeight: "6px"
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === Math.ceil(services?.length / 3) - 1}
                className="w-12 h-12 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronRight" size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-12">
          <Link to="/services-catalog">
            <Button
              variant="default"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;