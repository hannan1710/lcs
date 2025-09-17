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

  // Simple stylist data
  const mockStylists = [
    {
      id: 1,
      name: "Imran Salmani",
      title: "Creative Director",
      image: "imsa.jpg",
      experience: 12,
      rating: 4.8,
      specialties: ["Hair Color", "Balayage", "Highlights"],
      bio: "Master colorist with over 12 years of experience creating stunning transformations."
    },
    {
      id: 2,
      name: "Nizam Shaikh", 
      title: "Master Stylist",
      image: "nizam.jpg",
      experience: 20,
      rating: 4.8,
      specialties: ["Precision Cuts", "Men's Grooming", "Editorial Styling"],
      bio: "Creative Director with 20+ years of experience in high-end styling and editorial work."
    },
    {
      id: 3,
      name: "Afsan Khan",
      title: "Hair Stylist",
      image: "afsan.jpg", 
      experience: 5,
      rating: 4.9,
      specialties: ["Hair Extensions", "Keratin Treatments", "Curly Hair"],
      bio: "Specializes in extensions and texture treatments, helping clients achieve their dream hair goals."
    },
    {
      id: 4,
      name: "Ajaz",
      title: "Men's Grooming Specialist",
      image: "ajaz.webp",
      experience: 10,
      rating: 4.7,
      specialties: ["Men's Cuts", "Beard Styling", "Classic Barbering"],
      bio: "Traditional barbering skills with modern techniques for the contemporary gentleman."
    },
    {
      id: 5,
      name: "Preety",
      title: "Bridal & Beauty Specialist", 
      image: "preety.webp",
      experience: 9,
      rating: 4.8,
      specialties: ["Pedicure", "Nails", "Manicure", "Hydra Facial"],
      bio: "Enhances natural beauty with elegant nail care and glowing skin treatments."
    },
    {
      id: 6,
      name: "Pooja",
      title: "Nail & Skin Care Specialist",
      image: "pooja.webp",
      experience: 11,
      rating: 4.9,
      specialties: ["Pedicure", "Nails", "Manicure", "Hydra Facial"],
      bio: "Specializes in advanced nail and skin care, offering luxurious treatments."
    }
  ];

  // Simple filter logic
  useEffect(() => {
    let filtered = stylists;

    if (selectedSpecialty !== "all") {
      filtered = filtered?.filter((stylist) =>
        stylist?.specialties?.some((specialty) =>
          specialty?.toLowerCase()?.includes(selectedSpecialty?.toLowerCase())
        )
      );
    }

    if (selectedExperience !== "all") {
      const minExperience = parseInt(selectedExperience?.replace("+", ""));
      filtered = filtered?.filter((stylist) => stylist?.experience >= minExperience);
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
      <section className="pt-20 pb-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Expert Stylists
            </h1>
            <p className="text-muted-foreground mb-6">
              Meet our talented team of professionals ready to create your perfect look.
            </p>
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
      {/* Simple CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <button
            onClick={() => navigate("/appointment-booking")}
            className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-luxury flex items-center justify-center space-x-2 mx-auto"
          >
            <Icon name="Calendar" size={20} />
            <span>Book Appointment</span>
          </button>
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
