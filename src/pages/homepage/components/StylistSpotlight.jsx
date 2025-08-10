import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StylistSpotlight = () => {
  const [currentStylist, setCurrentStylist] = useState(0);

  const stylists = [
    {
      id: 1,
      name: "Isabella Martinez",
      title: "Master Colorist & Creative Director",
      specialties: ["Balayage", "Color Correction", "Creative Color"],
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1594824388853-d0c5d7e0e3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Isabella is renowned for her innovative color techniques and has trained with top colorists in Paris and New York. Her artistic vision transforms hair into living art.",
      certifications: ["Redken Master Colorist", "Olaplex Certified", "Balayage Specialist"],
      socialMedia: {
        instagram: "@isabella_colorist",
        portfolio: "150+ transformations"
      }
    },
    {
      id: 2,
      name: "Marcus Thompson",
      title: "Senior Stylist & Men\'s Grooming Expert",
      specialties: ["Precision Cuts", "Men\'s Styling", "Beard Design"],
      experience: "10 years",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800",
      bio: "Marcus combines classic barbering techniques with modern styling to create sophisticated looks for the discerning gentleman. His attention to detail is unmatched.",
      certifications: ["Master Barber License", "Aveda Certified", "Men\'s Grooming Specialist"],
      socialMedia: {
        instagram: "@marcus_cuts",
        portfolio: "200+ satisfied clients"
      }
    },
    {
      id: 3,
      name: "Sophia Chen",
      title: "Bridal Specialist & Texture Expert",
      specialties: ["Bridal Styling", "Curly Hair", "Updos"],
      experience: "8 years",
      image: "https://images.pixabay.com/photos/2016/11/21/12/42/beard-1845166_960_720.jpg",
      bio: "Sophia specializes in creating stunning bridal looks and working with all hair textures. Her gentle approach and artistic eye make every client feel beautiful.",
      certifications: ["Bridal Styling Certificate", "DevaCurl Certified", "Texture Specialist"],
      socialMedia: {
        instagram: "@sophia_bridal",
        portfolio: "100+ weddings"
      }
    },
    {
      id: 4,
      name: "Alexander Rivera",
      title: "Hair Extension & Treatment Specialist",
      specialties: ["Extensions", "Keratin Treatments", "Hair Restoration"],
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Alexander is our go-to expert for hair extensions and restorative treatments. His technical expertise helps clients achieve their dream hair safely and beautifully.",
      certifications: ["Extension Specialist", "Keratin Expert", "Trichology Certified"],
      socialMedia: {
        instagram: "@alex_extensions",
        portfolio: "300+ transformations"
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStylist((prev) => (prev + 1) % stylists?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stylists?.length]);

  const nextStylist = () => {
    setCurrentStylist((prev) => (prev + 1) % stylists?.length);
  };

  const prevStylist = () => {
    setCurrentStylist((prev) => (prev - 1 + stylists?.length) % stylists?.length);
  };

  const currentStylistData = stylists?.[currentStylist];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Meet Our Master Stylists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of award-winning stylists brings years of expertise and artistic vision to create your perfect look.
          </p>
        </div>

        {/* Stylist Spotlight */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-3xl shadow-luxury overflow-hidden border border-border">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image
                  src={currentStylistData?.image}
                  alt={currentStylistData?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevStylist}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-luxury shadow-lg"
                >
                  <Icon name="ChevronLeft" size={20} className="text-foreground" />
                </button>
                
                <button
                  onClick={nextStylist}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-luxury shadow-lg"
                >
                  <Icon name="ChevronRight" size={20} className="text-foreground" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {currentStylistData?.name}
                  </h3>
                  <p className="text-accent font-medium text-lg mb-4">
                    {currentStylistData?.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {currentStylistData?.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStylistData?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience & Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Experience</h4>
                    <p className="text-muted-foreground">{currentStylistData?.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Portfolio</h4>
                    <p className="text-muted-foreground">{currentStylistData?.socialMedia?.portfolio}</p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Certifications</h4>
                  <div className="space-y-1">
                    {currentStylistData?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Icon name="Award" size={16} className="text-accent" />
                        <span className="text-sm text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant="default"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.location.href = '/appointment-booking'}
                >
                  Book with {currentStylistData?.name?.split(' ')?.[0]}
                </Button>
              </div>
            </div>
          </div>

          {/* Stylist Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {stylists?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStylist(index)}
                className={`w-3 h-3 rounded-full transition-luxury ${
                  index === currentStylist ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Team CTA */}
        <div className="text-center mt-12">
          <Link to="/stylist-profiles">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Meet Our Full Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StylistSpotlight;