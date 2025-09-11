import React, { useState, useEffect } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const StylistSpotlight = () => {
  const [currentStylist, setCurrentStylist] = useState(0);

  const stylists = [
    {
      id: 1,
      name: "Imran",
      title: "Senior Hair Stylist",
      specialties: ["Haircuts", "Beard Styling", "Grooming"],
      experience: "8 years",
      image: "/imsa.jpg",
      bio: "Imran is known for his precision cuts and modern men’s grooming styles. Clients love his attention to detail and trend-focused approach.",
    },
    {
      id: 2,
      name: "Nizam",
      title: "Color Specialist",
      specialties: ["Hair Coloring", "Balayage", "Highlights"],
      experience: "6 years",
      image: "/nizam.jpg",
      bio: "Nizam transforms looks with bold and creative color techniques, ensuring every client leaves with a personalized, radiant style.",
    },
    {
      id: 3,
      name: "Shahista",
      title: "Bridal & Makeup Artist",
      specialties: ["Bridal Styling", "Makeup", "Hairstyling"],
      experience: "10 years",
      image: "/assets/images/shahi.jpg",
      bio: "Shahista specializes in luxury bridal looks, combining traditional elegance with modern artistry to create unforgettable transformations.",
    },
    {
      id: 4,
      name: "Hannan",
      title: "Salon Manager & Stylist",
      specialties: ["Management", "Client Styling", "Luxury Experience"],
      experience: "7 years",
      image: "/assets/images/hannan.jpg",
      bio: "Hannan manages La Coiffure Salon while also bringing his own creative touch to client styling, ensuring a premium experience for all.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStylist((prev) => (prev + 1) % stylists?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stylists?.length]);

  const nextStylist = () =>
    setCurrentStylist((prev) => (prev + 1) % stylists?.length);
  const prevStylist = () =>
    setCurrentStylist((prev) => (prev - 1 + stylists?.length) % stylists?.length);

  const currentStylistData = stylists?.[currentStylist];

  return (
    <section className="py-8 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-2">
            Meet Our Core Team
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Our expert team brings creativity, skill, and years of experience to
            help you look your best.
          </p>
        </div>

        {/* Stylist Spotlight */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-luxury overflow-hidden border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-64 lg:h-96">
                <Image
                  src={currentStylistData?.image}
                  alt={currentStylistData?.name}
                  className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevStylist}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-luxury"
                >
                  <Icon name="ChevronLeft" size={24} className="text-white" />
                </button>

                <button
                  onClick={nextStylist}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-luxury"
                >
                  <Icon name="ChevronRight" size={24} className="text-white" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 lg:p-10 flex flex-col justify-center">
                {/* Name */}
                <h3 className="font-heading text-xl lg:text-3xl font-bold text-foreground mb-1">
                  {currentStylistData?.name}
                </h3>

                {/* Title */}
                <p className="text-accent font-medium text-sm sm:text-base mb-4">
                  {currentStylistData?.title}
                </p>

                {/* Bio */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {currentStylistData?.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStylistData?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 gap-2">
  {stylists?.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentStylist(index)}
      className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full transition-luxury ${
        index === currentStylist ? "bg-accent scale-150" : "bg-muted"
      }`}
    />
  ))}
</div>
        </div>
      </div>
    </section>
  );
};

export default StylistSpotlight;