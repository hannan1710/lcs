import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import FilterSection from "./components/FilterSection";
import StylistGrid from "./components/StylistGrid";
import StylistDetailModal from "./components/StylistDetailModal";
import Icon from "../../components/AppIcon";
import { stylistsAPI } from "../../services/api";
import { useBranch } from "../../contexts/BranchContext";

const StylistProfiles = () => {
  const navigate = useNavigate();
  const { currentBranch, getCurrentBranchData } = useBranch();
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stylists, setStylists] = useState([]);
  const [filteredStylists, setFilteredStylists] = useState([]);

  // Load stylists from API
  useEffect(() => {
    const loadStylists = async () => {
      setIsLoading(true);
      try {
        const response = await stylistsAPI.getAll(currentBranch);
        const stylistsData = response.stylists || response || [];
        setStylists(stylistsData);
        setFilteredStylists(stylistsData);
      } catch (error) {
        console.error('Error loading stylists:', error);
        setStylists([]);
        setFilteredStylists([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentBranch) {
      loadStylists();
    }
  }, [currentBranch]);

  // Mock stylist data (fallback)
  const mockStylists = [
    {
      id: 1,
      name: "Imran Salmani",
      title: "Creative Director",
      image: "imsa.jpg",
      experience: 12,
      rating: 4.8,
      reviewCount: 203,
      startingPrice: 220,
      specialties: [
        "Hair Stylist",
        "Hair Color",
        "Balayage",
        "Color Correction",
        "Highlights",
      ],
      bio: "Imran Salmani  is a master colorist with over 12 years of experience creating stunning transformations.",
      fullBio: `Imran Salmani is a renowned color specialist with over 12 years of experience in luxury hair salons. He specializes in advanced color techniques including balayage, ombre, and color correction. He has trained with top colorists in Paris and New York, bringing international expertise to La Coiffure.\n\nHis passion for color theory and artistic vision has earned her recognition in the industry, with his work featured in several beauty magazines. Imran believes in creating personalized color experiences that enhance each client's natural beauty and lifestyle.`,
      certifications: [
        "L'Oréal Professional Master Colorist",
        "Redken Color Specialist Certification",
        "Balayage Specialist - Oway Academy",
        "Color Correction Expert - Schwarzkopf",
      ],
      education: [
        "Advanced Color Theory - Aveda Institute",
        "International Color Techniques - Paris Academy",
        "Hair Chemistry & Color Science - Wella Education",
      ],
      portfolio: [
        {
          image:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
          title: "Platinum Blonde Transformation",
          description:
            "Complete color transformation from dark brown to platinum blonde using advanced lightening techniques.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop",
          title: "Sunset Balayage",
          description:
            "Warm sunset-inspired balayage with copper and gold tones for a natural sun-kissed look.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop",
          title: "Color Correction",
          description:
            "Professional color correction from damaged bleached hair to healthy dimensional brunette.",
        },
      ],
      reviews: [
        {
          clientName: "Sarah Johnson",
          rating: 5,
          comment:
            "Isabella is absolutely amazing! She transformed my hair completely and I couldn't be happier with the results.",
          date: "December 15, 2024",
        },
        {
          clientName: "Rohit Srivastava",
          rating: 5,
          comment:
            "Best colorist I've ever been to. She really listens and creates exactly what you envision.",
          date: "December 10, 2024",
        },
        {
          clientName: "Joulle",
          rating: 5,
          comment:
            "Best colorist I've ever been to. She really listens and creates exactly what you envision.",
          date: "December 10, 2024",
        },
        {
          clientName: "Hannan Ansari ",
          rating: 5,
          comment:
            "Best colorist I've ever been to. She really listens and creates exactly what you envision.",
          date: "December 10, 2024",
        },
      ],
      availability: [
        { day: "Monday", date: "Sept 8", slots: ["10:00 AM", "2:00 PM"] },
        {
          day: "Tuesday",
          date: "Sept 9",
          slots: ["9:00 AM", "1:00 PM", "4:00 PM"],
        },
        { day: "Wednesday", date: "Sept 10", slots: [] },
        { day: "Thursday", date: "Sept 11", slots: ["11:00 AM", "3:00 PM"] },
        { day: "Friday", date: "Sept 12", slots: ["11:00 AM", "3:00 PM"] },
        { day: "Saturday", date: "Sept 13", slots: ["11:00 AM", "3:00 PM"] },
        { day: "sunday", date: "Sept 14", slots: ["11:00 AM", "3:00 PM"] },
      ],
    },
    {
      id: 2,
      name: "Nizam Shaikh",
      title: "Master Stylist & Art Director",
      image: "nizam.jpg",
      experience: 20,
      rating: 4.8,
      reviewCount: 203,
      startingPrice: 220,
      specialties: [
        "Precision Cuts",
        "Men's Grooming",
        "Editorial Styling",
        "Global+",
      ],
      bio: "Nizam is our Creative Director with 15+ years of experience in high-end styling and editorial work.",
      fullBio: `Nizam Shaikh serves as La Coiffure's Art Director, bringing over 20years of expertise in precision cutting and editorial styling. His career began in London's prestigious salons before moving to New York, where he worked with top fashion photographers and celebrities.\n\nNizam's cutting techniques are influenced by classic European methods combined with modern American trends. He has styled hair for numerous fashion shows, magazine shoots, and red carpet events. His approach focuses on creating timeless styles that complement each client's facial structure and personal aesthetic.`,
      certifications: [
        "Vidal Sassoon Advanced Cutting Techniques",
        "Toni & Guy Creative Cutting Specialist",
        "Men's Grooming Expert - American Crew",
        "Bridal Styling Certification - Redken",
      ],
      education: [
        "Advanced Cutting Academy - London",
        "Editorial Styling Workshop - New York Fashion Week",
        "Men's Grooming Specialist Course - Los Angeles",
      ],
      portfolio: [
        {
          image:
            "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop",
          title: "Modern Bob Cut",
          description:
            "Precision bob cut with subtle layers for movement and sophistication.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
          title: "Men's Executive Style",
          description:
            "Classic executive cut with modern styling for the professional gentleman.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
          title: "Bridal Updo",
          description:
            "Elegant bridal updo with intricate braiding and romantic finishing touches.",
        },
      ],
      reviews: [
        {
          clientName: "Michael Rodriguez",
          rating: 5,
          comment:
            "Alexander has been cutting my hair for 3 years. Always professional and delivers exactly what I want.",
          date: "December 12, 2024",
        },
        {
          clientName: "Jennifer Walsh",
          rating: 5,
          comment:
            "He did my wedding hair and it was absolutely perfect. Highly recommend!",
          date: "December 8, 2024",
        },
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["9:00 AM", "1:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: [] },
        {
          day: "Wednesday",
          date: "Jan 10",
          slots: ["10:00 AM", "2:00 PM", "5:00 PM"],
        },
        { day: "Thursday", date: "Jan 11", slots: ["11:00 AM"] },
      ],
    },
    {
      id: 3,
      name: "Afsan Khan",
      title: "Hair Stylist ",
      image: "afsan.jpg",
      experience: 5,
      rating: 4.9,
      reviewCount: 89,
      startingPrice: 160,
      specialties: [
        "Hair Extensions",
        "Keratin Treatments",
        "Curly Hair",
        "Volume Enhancement",
      ],
      bio: "Afsan specializes in extensions and texture treatments, helping clients achieve their dream hair goals.",
      fullBio: `Afsan Khan is our premier extension and texture specialist with 5 years of dedicated experience in hair enhancement techniques. She has mastered various extension methods including tape-in, micro-link, and hand-tied wefts, ensuring natural-looking results that blend seamlessly.\n\nHer expertise extends to texture treatments, particularly working with curly and textured hair. Afsan understands the unique needs of different hair types and creates customized treatment plans that enhance natural texture while maintaining hair health. She regularly attends advanced training sessions to stay current with the latest techniques and products.`,
      certifications: [
        "Certified Extension Specialist - Great Lengths",
        "Keratin Treatment Expert - Brazilian Blowout",
        "Curly Hair Specialist - DevaCurl Academy",
        "Hair Health & Restoration - Olaplex Professional",
      ],
      education: [
        "Extension Techniques Masterclass - Los Angeles",
        "Texture Treatment Specialist Course - Miami",
        "Curly Hair Science Workshop - Atlanta",
      ],
      portfolio: [
        {
          image:
            "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
          title: "Seamless Extensions",
          description:
            "Hand-tied weft extensions adding length and volume with perfect color matching.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
          title: "Keratin Smoothing",
          description:
            "Professional keratin treatment for frizz control and enhanced shine.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
          title: "Curly Hair Enhancement",
          description:
            "Specialized cut and treatment for natural curls, enhancing definition and bounce.",
        },
      ],
      reviews: [
        {
          clientName: "Amanda Foster",
          rating: 5,
          comment:
            "Sophia gave me the most beautiful extensions! They look so natural and feel amazing.",
          date: "December 14, 2024",
        },
        {
          clientName: "Lisa Park",
          rating: 5,
          comment:
            "Finally found someone who understands curly hair! My curls have never looked better.",
          date: "December 11, 2024",
        },
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["11:00 AM", "3:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: ["10:00 AM", "2:00 PM"] },
        {
          day: "Wednesday",
          date: "Jan 10",
          slots: ["9:00 AM", "1:00 PM", "4:00 PM"],
        },
        { day: "Thursday", date: "Jan 11", slots: ["12:00 PM", "3:00 PM"] },
      ],
    },
    {
      id: 4,
      name: "Ajaz",
      title: "Men's Grooming Specialist",
      image: "ajaz.webp",
      experience: 10,
      rating: 4.7,
      reviewCount: 156,
      startingPrice: 85,
      specialties: [
        "Men's Cuts",
        "Beard Styling",
        "Classic Barbering",
        "Modern Fades",
      ],
      bio: "Ajaz brings traditional barbering skills with modern techniques for the contemporary gentleman.",
      fullBio: `Ajaz combines traditional barbering heritage with contemporary styling techniques, serving the modern gentleman for over 10 years. His expertise spans classic cuts, precision fades, and professional beard grooming, making him the go-to specialist for discerning male clientele.\n\nTrained in both traditional barbering and modern salon techniques, Ajaz understands the importance of a well-groomed appearance in professional and personal settings. He takes pride in creating sharp, clean looks that enhance masculine features while maintaining practicality for busy lifestyles.`,
      certifications: [
        "Master Barber License - State Certified",
        "Men's Grooming Specialist - American Crew",
        "Beard & Mustache Styling Expert",
        "Classic Barbering Techniques - Traditional Academy",
      ],
      education: [
        "Traditional Barbering School - Chicago",
        "Modern Men's Styling Workshop - New York",
        "Beard Grooming Masterclass - Portland",
      ],
      portfolio: [
        {
          image:
            "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=400&fit=crop",
          title: "Executive Business Cut",
          description:
            "Professional business cut with clean lines and sophisticated styling.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop",
          title: "Modern Fade",
          description:
            "Contemporary fade cut with textured top for a modern, stylish look.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
          title: "Beard Grooming",
          description:
            "Professional beard trimming and styling for the complete gentleman's look.",
        },
      ],
      reviews: [
        {
          clientName: "David Thompson",
          rating: 5,
          comment:
            "Marcus always delivers a perfect cut. Professional service and great attention to detail.",
          date: "December 13, 2024",
        },
        {
          clientName: "Robert Kim",
          rating: 4,
          comment:
            "Great barber skills and friendly service. My go-to place for haircuts.",
          date: "December 9, 2024",
        },
      ],
      availability: [
        {
          day: "Monday",
          date: "Jan 8",
          slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
        },
        {
          day: "Tuesday",
          date: "Jan 9",
          slots: ["10:00 AM", "1:00 PM", "3:00 PM"],
        },
        { day: "Wednesday", date: "Jan 10", slots: ["9:00 AM", "12:00 PM"] },
        {
          day: "Thursday",
          date: "Jan 11",
          slots: ["10:00 AM", "2:00 PM", "4:00 PM"],
        },
      ],
    },
    {
      id: 5,
      name: "Preety",
      title: "Bridal & Beauty Specialist",
      image:"preety.webp",
      experience: 9,
      rating: 4.8,
      reviewCount: 160,
      startingPrice: 200,
      specialties: ["Pedicure", "Nails", "Manicure", "Hydra Facial"],
      bio: "Preety enhances natural beauty with elegant nail care and glowing skin treatments, perfect for brides and special events.",
      fullBio: `Preety is our versatile bridal and beauty specialist with 9 years of experience in event styling and personal care services. In addition to creating stunning bridal looks, she is skilled in pedicure, manicure, and hydra facial treatments that prepare clients for their most important moments.\n\nHer approach focuses on delivering a balanced mix of beauty and wellness. Whether it’s ensuring flawless nails for a wedding, providing a calming pedicure before a big event, or giving a hydra facial for radiant skin, Preety tailors each service to suit the occasion. She is known for her warm personality, attention to detail, and ability to create a luxurious experience that leaves clients feeling both confident and pampered.`,
      certifications: [
        "Certified Bridal Makeup & Styling",
        "Professional Nail Care Certification",
        "Advanced Skin & Facial Treatments",
        "Luxury Spa Therapy Diploma",
      ],
      education: [
        "Beauty & Bridal Institute - Mumbai",
        "International School of Nail Art - Bangkok",
        "Advanced Skincare Workshop - Dubai",
      ],
      portfolio: [
        {
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
          title: "Bridal Glow",
          description:
            "Hydra facial and beauty prep for a radiant bridal look.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=400&h=400&fit=crop",
          title: "Classic Manicure",
          description:
            "Elegant manicure designed for weddings and special occasions.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1534643974235-45b5c0c9f1e0?w=400&h=400&fit=crop",
          title: "Luxury Pedicure",
          description:
            "Relaxing spa pedicure to complement bridal and event styling.",
        },
      ],
      reviews: [
        {
          clientName: "Simran Kaur",
          rating: 5,
          comment:
            "Preety made my bridal day stress-free and beautiful. Her facials and nail services were perfect!",
          date: "January 8, 2025",
        },
        {
          clientName: "Neha Verma",
          rating: 4.5,
          comment:
            "Her pedicure and manicure before my engagement were flawless. Highly recommended!",
          date: "December 22, 2024",
        },
      ],
      availability: [
        {
          day: "Tuesday",
          date: "Jan 16",
          slots: ["11:00 AM", "2:30 PM", "6:00 PM"],
        },
        {
          day: "Thursday",
          date: "Jan 18",
          slots: ["10:00 AM", "1:00 PM", "5:00 PM"],
        },
        {
          day: "Saturday",
          date: "Jan 20",
          slots: ["12:00 PM", "3:00 PM", "7:00 PM"],
        },
      ],
    },
    {
      id: 6,
      name: "Pooja",
      title: "Nail & Skin Care Specialist",
      image:"pooja.webp",
      experience: 11,
      rating: 4.9,
      reviewCount: 182,
      startingPrice: 150,
      specialties: ["Pedicure", "Nails", "Manicure", "Hydra Facial"],
      bio: "Pooja specializes in advanced nail and skin care, offering luxurious pedicures, manicures, and hydra facials.",
      fullBio: `Pooja is our dedicated nail and skin care specialist with 11 years of experience in beauty and wellness treatments. She focuses on delivering professional pedicures, manicures, and advanced hydra facials that enhance both beauty and self-care.\n\nHer expertise lies in combining modern techniques with premium products to provide lasting results and a relaxing experience. Pooja is known for her precision in nail artistry, her attention to detail in hand and foot care, and her rejuvenating hydra facial treatments. She regularly attends workshops to stay updated with the latest beauty trends and skin care innovations. Clients appreciate her gentle approach, creativity, and commitment to making every session a pampering experience.`,
      certifications: [
        "Certified Nail Technician",
        "Advanced Pedicure & Manicure Workshop",
        "Hydra Facial Specialist Certification",
        "Luxury Beauty & Wellness Diploma",
      ],
      education: [
        "International Nail Academy - Dubai",
        "Skin & Beauty Institute - Mumbai",
        "Advanced Facial Care Workshop - Singapore",
      ],
      portfolio: [
        {
          image:
            "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=400&h=400&fit=crop",
          title: "Nail Art",
          description: "Creative and elegant nail designs for all occasions.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
          title: "Hydra Facial Glow",
          description: "Rejuvenating hydra facial treatment for glowing skin.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=400&fit=crop",
          title: "Luxury Pedicure",
          description: "Relaxing pedicure with premium care products.",
        },
      ],
      reviews: [
        {
          clientName: "Ritika Sharma",
          rating: 5,
          comment:
            "Pooja’s hydra facial left my skin glowing and refreshed. Loved the whole experience!",
          date: "January 5, 2025",
        },
        {
          clientName: "Anjali Mehta",
          rating: 5,
          comment:
            "Her manicure and pedicure services are outstanding. Very detailed and professional.",
          date: "December 20, 2024",
        },
      ],
      availability: [
        {
          day: "Monday",
          date: "Jan 15",
          slots: ["10:00 AM", "2:00 PM", "5:00 PM"],
        },
        { day: "Wednesday", date: "Jan 17", slots: ["11:00 AM", "3:00 PM"] },
        {
          day: "Friday",
          date: "Jan 19",
          slots: ["12:00 PM", "4:00 PM", "7:00 PM"],
        },
      ],
    },
  ];

  // Filter stylists based on selected criteria
  useEffect(() => {
    let filtered = stylists;

    if (selectedSpecialty !== "all") {
      const specialtyMap = {
        "hair-color": [
          "Hair Color",
          "Balayage",
          "Color Correction",
          "Highlights",
          "Hair Coloring",
          "Ombre"
        ],
        "hair-cuts": ["Precision Cuts", "Men's Cuts", "Hair Cuts", "Hair Cutting", "Men's Haircut"],
        extensions: ["Hair Extensions", "Volume Enhancement"],
        bridal: ["Bridal", "Bridal Styling", "Special Events", "Bridal Hair"],
        treatments: ["Hair Treatments", "Keratin Treatments", "Scalp Care", "Hair Masks"],
        styling: ["Hair Styling", "Styling", "Blowouts", "Hair Styling"]
      };

      const targetSpecialties = specialtyMap?.[selectedSpecialty] || [];
      filtered = filtered?.filter((stylist) =>
        stylist?.services?.some((service) =>
          targetSpecialties?.some(
            (target) =>
              service?.toLowerCase()?.includes(target?.toLowerCase()) ||
              target?.toLowerCase()?.includes(service?.toLowerCase())
          )
        ) || 
        stylist?.specialty?.toLowerCase()?.includes(selectedSpecialty?.toLowerCase())
      );
    }

    if (selectedExperience !== "all") {
      const minExperience = parseInt(selectedExperience?.replace("+", ""));
      filtered = filtered?.filter(
        (stylist) => {
          const experience = parseInt(stylist?.experience?.replace(" years", ""));
          return experience >= minExperience;
        }
      );
    }

    setFilteredStylists(filtered);
  }, [selectedSpecialty, selectedExperience, stylists]);


  const handleViewDetails = (stylist) => {
    setSelectedStylist(stylist);
    setIsModalOpen(true);
  };

  const handleBookAppointment = (stylist) => {
    navigate("/appointment-booking", {
      state: {
        selectedStylist: stylist,
        preselectedService: stylist?.specialties?.[0],
      },
    });
  };

  const handleClearFilters = () => {
    setSelectedSpecialty("all");
    setSelectedExperience("all");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedSpecialty !== "all") count++;
    if (selectedExperience !== "all") count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Meet Our Expert Stylists
            </h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Discover La Coiffure's talented team of luxury hair professionals.
              Each stylist brings unique expertise and artistry to create your
              perfect look with personalized attention and exceptional skill.
            </p>
            {currentBranch && (
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-8">
                <Icon name="MapPin" size={16} />
                <span>{getCurrentBranchData()?.name || 'Current Branch'} Stylists</span>
              </div>
            )}
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span>Certified Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-accent" />
                <span>4.8+ Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span>Expert Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Filter Section */}
          <FilterSection
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={setSelectedSpecialty}
            selectedExperience={selectedExperience}
            onExperienceChange={setSelectedExperience}
            onClearFilters={handleClearFilters}
            activeFiltersCount={getActiveFiltersCount()}
          />

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                {isLoading
                  ? "Loading Stylists..."
                  : `${filteredStylists?.length} Stylists Available`}
              </h2>
              {!isLoading && getActiveFiltersCount() > 0 && (
                <p className="text-muted-foreground mt-1">
                  Filtered by {selectedSpecialty !== "all" && "specialty"}
                  {selectedSpecialty !== "all" &&
                    selectedExperience !== "all" &&
                    " and "}
                  {selectedExperience !== "all" && "experience level"}
                </p>
              )}
            </div>
          </div>

          {/* Stylists Grid */}
          <StylistGrid
            stylists={filteredStylists}
            onViewDetails={handleViewDetails}
            onBookAppointment={handleBookAppointment}
            isLoading={isLoading}
          />
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
            Can't Decide? Let Us Help
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Not sure which stylist is right for you? Our team can help match you
            with the perfect professional based on your hair goals, preferences,
            and desired services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact-location")}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-luxury flex items-center justify-center space-x-2"
            >
              <Icon name="MessageCircle" size={20} />
              <span>Get Consultation</span>
            </button>
            <button
              onClick={() => navigate("/appointment-booking")}
              className="px-8 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-luxury flex items-center justify-center space-x-2"
            >
              <Icon name="Calendar" size={20} />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </section>
      {/* Stylist Detail Modal */}
      <StylistDetailModal
        stylist={selectedStylist}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default StylistProfiles;
