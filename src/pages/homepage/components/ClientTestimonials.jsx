import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Beverly Hills, CA",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `La Coiffure transformed my hair completely! Isabella's color work is absolutely stunning. I've never felt more confident about my appearance. The salon atmosphere is luxurious and the service is impeccable.`,
      service: "Premium Color Treatment",
      date: "December 2024"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      location: "Manhattan, NY",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `Marcus is a true artist. His attention to detail and understanding of men's grooming is exceptional. I've been coming here for two years and wouldn't trust anyone else with my hair.`,
      service: "Men\'s Grooming Service",
      date: "November 2024"
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "San Francisco, CA",
      rating: 5,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      testimonial: `Sophia made my wedding day absolutely perfect! Her bridal styling exceeded all my expectations. Every detail was flawless, and I felt like a princess. Thank you for making my special day even more beautiful.`,
      service: "Bridal Beauty Package",
      date: "October 2024"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Los Angeles, CA",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `The keratin treatment by Alexander completely changed my hair texture. It's now smooth, manageable, and looks healthy. The results have lasted months and I couldn't be happier with the investment.`,
      service: "Keratin Treatment",
      date: "September 2024"
    },
    {
      id: 5,
      name: "Jessica Williams",
      location: "Miami, FL",
      rating: 5,
      image: "https://images.pixabay.com/photos/2016/11/29/20/22/girl-1871104_960_720.jpg",
      testimonial: `From the moment I walked in, I knew I was in the right place. The luxury experience, combined with incredible skill, makes La Coiffure the best salon I've ever been to. Worth every penny!`,
      service: "Signature Hair Cut & Style",
      date: "December 2024"
    },
    {
      id: 6,
      name: "Robert Davis",
      location: "Chicago, IL",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `Professional, skilled, and incredibly welcoming. The team at La Coiffure understands luxury service. My facial treatment was relaxing and rejuvenating. I'll definitely be returning regularly.`,
      service: "Luxury Facial Treatment",
      date: "November 2024"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied clients who have experienced the La Coiffure difference.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-luxury border border-border overflow-hidden">
            <div className="p-8 lg:p-12 text-center">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Quote" size={32} className="text-accent" />
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: currentData?.rating })?.map((_, index) => (
                  <Icon key={index} name="Star" size={24} className="text-accent fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 italic">
                "{currentData?.testimonial}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent/20">
                    <Image
                      src={currentData?.image}
                      alt={currentData?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground text-lg">
                      {currentData?.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {currentData?.location}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-border" />

                <div className="text-center sm:text-left">
                  <p className="text-accent font-medium">
                    {currentData?.service}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {currentData?.date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-luxury ${
                    index === currentTestimonial ? 'bg-accent' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">4.9</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">15+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-muted-foreground">Return Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;