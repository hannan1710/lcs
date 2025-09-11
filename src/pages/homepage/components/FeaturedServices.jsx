import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedServices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      id: 1,
      name: "Signature Hair Cut & Style",
      description: "Personalized cutting and styling consultation with our master stylists, tailored to enhance your unique features and lifestyle.",
      startingPrice: "$150",
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "90 min",
      category: "Hair"
    },
    {
      id: 2,
      name: "Premium Color Treatment",
      description: "Advanced color techniques including balayage, highlights, and full color transformations using luxury professional products.",
      startingPrice: "$250",
      image: "https://images.pixabay.com/photos/2016/03/26/22/13/woman-1281826_960_720.jpg",
      duration: "3 hours",
      category: "Color"
    },
    {
      id: 3,
      name: "Luxury Facial Treatment",
      description: "Rejuvenating facial treatments with premium skincare products, customized to your skin type and concerns.",
      startingPrice: "$120",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "75 min",
      category: "Skincare"
    },
    {
      id: 4,
      name: "Bridal Beauty Package",
      description: "Complete bridal preparation including hair styling, makeup application, and skincare treatments for your special day.",
      startingPrice: "$450",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "4 hours",
      category: "Bridal"
    },
    {
      id: 5,
      name: "Keratin Treatment",
      description: "Professional keratin smoothing treatment to eliminate frizz and create silky, manageable hair that lasts for months.",
      startingPrice: "$300",
      image: "https://images.pixabay.com/photos/2017/07/31/11/22/people-2557396_960_720.jpg",
      duration: "2.5 hours",
      category: "Treatment"
    },
    {
      id: 6,
      name: "Men's Grooming Service",
      description: "Complete men's grooming experience including precision cuts, beard styling, and premium skincare treatments.",
      startingPrice: "$85",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "60 min",
      category: "Men's"
    },
     {
      id: 6,
      name: "woMen's Grooming Service",
      description: "Complete men's grooming experience including precision cuts, beard styling, and premium skincare treatments.",
      startingPrice: "$85",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "60 min",
      category: "Men's"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services?.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(services?.length / 4)) % Math.ceil(services?.length / 3));
  };

  const getVisibleServices = () => {
    const startIndex = currentSlide * 4;
    return services?.slice(startIndex, startIndex + 4);
  };

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
                {services?.map((service) => (
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
                              From {service?.startingPrice}
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
                        <span className="text-base font-semibold text-accent">
                          From {service?.startingPrice}
                        </span>
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
