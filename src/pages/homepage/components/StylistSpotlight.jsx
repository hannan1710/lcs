import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const StylistSpotlight = () => {
  const [currentStylist, setCurrentStylist] = useState(0);

  const stylists = [
    {
      id: 1,
      name: "Imran Salmani",
      title: "Master Stylist & Creative Director",
      specialties: ["Hair Coloring", "Balayage", "Styling"],
      experience: "12+ years",
      image: "/assets/images/imsa.jpg",
      bio: "Imran is a master stylist specializing in precision hair coloring, balayage, and luxury styling. With over a decade of experience, he has transformed countless clients with his artistic touch.",
      certifications: ["L'Oréal Professional Certified", "Balayage Expert"],
    },
    {
      id: 2,
      name: "Nizam Shaikh",
      title: "Creative Director",
      specialties: ["Precision Cutting", "Editorial Styling", "Runway Looks"],
      experience: "15+ years",
      image: "/assets/images/nizam.jpg",
      bio: "Nizam brings international expertise from London and New York, blending European precision with modern trends. His editorial and runway work makes him a leader in high-fashion styling.",
      certifications: [
        "Advanced Cutting - Vidal Sassoon",
        "Editorial Styling Certified",
      ],
    },
    {
      id: 3,
      name: "Shahista Imran Salmani",
      title: "Beauty & Nail Expert",
      specialties: ["Pedicure", "Nail Art", "Manicure", "Hydra Facial"],
      experience: "11+ years",
      image: "/assets/images/shahi.jpg",
      bio: "Shahista is a beauty and nail specialist dedicated to enhancing natural beauty with expert skin and nail care. Her precision and creativity in nail art and facials leave clients glowing with confidence.",
      certifications: ["Nail Artistry Certified", "Hydra Facial Expert"],
    },
    {
      id: 4,
      name: "Abdul Hannan Ansari",
      title: "Social Media & Website Manager",
      specialties: [
        "Digital Branding",
        "Social Media Marketing",
        "Website Management",
      ],
      experience: "4+ years",
      image: "/assets/images/hannan.jpg",
      bio: "Hannan manages La Coiffure's online presence, ensuring the salon’s digital platforms reflect its luxury and creativity. He specializes in social media strategy, branding, and web management.",
      certifications: [
        "Certified Digital Marketer",
        "Web Development Specialist",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStylist((prev) => (prev + 1) % stylists.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stylists.length]);

  const nextStylist = () => {
    setCurrentStylist((prev) => (prev + 1) % stylists.length);
  };

  const prevStylist = () => {
    setCurrentStylist((prev) => (prev - 1 + stylists.length) % stylists.length);
  };

  const currentStylistData = stylists[currentStylist];

  return (
    <section className="py-6 sm:py-10 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Meet Our Core Team
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            Brings years of expertise and artistic vision.
          </p>
        </div>

        {/* Stylist Spotlight */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-border">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={currentStylistData?.image}
                  alt={currentStylistData?.name}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevStylist}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-md"
                >
                  <Icon name="ChevronLeft" size={16} className="text-black" />
                </button>
                <button
                  onClick={nextStylist}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-md"
                >
                  <Icon name="ChevronRight" size={16} className="text-black" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-3 sm:p-4 md:p-6 flex flex-col justify-center">
                <div className="mb-3 sm:mb-4">
                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1">
                    {currentStylistData?.name}
                  </h3>
                  <p className="text-accent font-medium text-xs sm:text-sm mb-2">
                    {currentStylistData?.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm">
                    {currentStylistData?.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStylistData?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>


                      {/* Portfolio
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">
                    Portfolio
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {currentStylistData?.socialMedia?.portfolio}
                  </p>
                </div> */}

                {/* Certifications */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">
                    Certifications
                  </h4>
                  <div className="space-y-1">
                    {currentStylistData?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Icon name="Award" size={14} className="text-accent" />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                {currentStylistData?.name !== "Abdul Hannan Ansari" && (
                  <Button
                    variant="default"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm px-3 py-1.5"
                    onClick={() =>
                      (window.location.href = "/appointment-booking")
                    }
                  >
                    Book with {currentStylistData?.name?.split(" ")?.[0]}
                  </Button>
                )}
              </div>
            </div>
          </div>

          
     {/* Stylist Indicators */}
<div className="flex justify-center mt-5 sm:mt-6 gap-2">
  {stylists?.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentStylist(index)}
      className={`p-0 appearance-none rounded-full transition 
        ${index === currentStylist ? "bg-accent" : "bg-muted"}`}
      style={{
        width: "6px",   // tiny dot
        height: "6px",  // tiny dot
        minWidth: "6px",
        minHeight: "6px",
      }}
    />
  ))}
</div>

        </div>

        {/* View All Team CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <Link to="/stylist-profiles">
            <Button
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm px-4 py-2"
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
