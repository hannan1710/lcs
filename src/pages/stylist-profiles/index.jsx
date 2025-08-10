import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSection from './components/FilterSection';
import StylistGrid from './components/StylistGrid';
import StylistDetailModal from './components/StylistDetailModal';
import Icon from '../../components/AppIcon';

const StylistProfiles = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredStylists, setFilteredStylists] = useState([]);

  // Mock stylist data
  const stylists = [
    {
      id: 1,
      name: "Isabella Martinez",
      title: "Senior Color Specialist",
      image: "https://images.unsplash.com/photo-1594824388853-e0c2d2e9e8e5?w=400&h=500&fit=crop&crop=face",
      experience: 12,
      rating: 4.9,
      reviewCount: 127,
      startingPrice: 180,
      specialties: ["Hair Color", "Balayage", "Color Correction", "Highlights"],
      bio: "Isabella is a master colorist with over 12 years of experience creating stunning transformations.",
      fullBio: `Isabella Martinez is a renowned color specialist with over 12 years of experience in luxury hair salons. She specializes in advanced color techniques including balayage, ombre, and color correction. Isabella has trained with top colorists in Paris and New York, bringing international expertise to La Coiffure.\n\nHer passion for color theory and artistic vision has earned her recognition in the industry, with her work featured in several beauty magazines. Isabella believes in creating personalized color experiences that enhance each client's natural beauty and lifestyle.`,
      certifications: [
        "L\'Oréal Professional Master Colorist",
        "Redken Color Specialist Certification",
        "Balayage Specialist - Oway Academy",
        "Color Correction Expert - Schwarzkopf"
      ],
      education: [
        "Advanced Color Theory - Aveda Institute",
        "International Color Techniques - Paris Academy",
        "Hair Chemistry & Color Science - Wella Education"
      ],
      portfolio: [
        {
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
          title: "Platinum Blonde Transformation",
          description: "Complete color transformation from dark brown to platinum blonde using advanced lightening techniques."
        },
        {
          image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop",
          title: "Sunset Balayage",
          description: "Warm sunset-inspired balayage with copper and gold tones for a natural sun-kissed look."
        },
        {
          image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop",
          title: "Color Correction",
          description: "Professional color correction from damaged bleached hair to healthy dimensional brunette."
        }
      ],
      reviews: [
        {
          clientName: "Sarah Johnson",
          rating: 5,
          comment: "Isabella is absolutely amazing! She transformed my hair completely and I couldn\'t be happier with the results.",
          date: "December 15, 2024"
        },
        {
          clientName: "Emily Chen",
          rating: 5,
          comment: "Best colorist I\'ve ever been to. She really listens and creates exactly what you envision.",
          date: "December 10, 2024"
        }
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["10:00 AM", "2:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: ["9:00 AM", "1:00 PM", "4:00 PM"] },
        { day: "Wednesday", date: "Jan 10", slots: [] },
        { day: "Thursday", date: "Jan 11", slots: ["11:00 AM", "3:00 PM"] }
      ]
    },
    {
      id: 2,
      name: "Alexander Thompson",
      title: "Master Stylist & Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
      experience: 15,
      rating: 4.8,
      reviewCount: 203,
      startingPrice: 220,
      specialties: ["Precision Cuts", "Men\'s Grooming", "Editorial Styling", "Bridal"],
      bio: "Alexander is our Creative Director with 15+ years of experience in high-end styling and editorial work.",
      fullBio: `Alexander Thompson serves as La Coiffure's Creative Director, bringing over 15 years of expertise in precision cutting and editorial styling. His career began in London's prestigious salons before moving to New York, where he worked with top fashion photographers and celebrities.\n\nAlexander's cutting techniques are influenced by classic European methods combined with modern American trends. He has styled hair for numerous fashion shows, magazine shoots, and red carpet events. His approach focuses on creating timeless styles that complement each client's facial structure and personal aesthetic.`,
      certifications: [
        "Vidal Sassoon Advanced Cutting Techniques",
        "Toni & Guy Creative Cutting Specialist",
        "Men\'s Grooming Expert - American Crew",
        "Bridal Styling Certification - Redken"
      ],
      education: [
        "Advanced Cutting Academy - London",
        "Editorial Styling Workshop - New York Fashion Week",
        "Men\'s Grooming Specialist Course - Los Angeles"
      ],
      portfolio: [
        {
          image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop",
          title: "Modern Bob Cut",
          description: "Precision bob cut with subtle layers for movement and sophistication."
        },
        {
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
          title: "Men\'s Executive Style",
          description: "Classic executive cut with modern styling for the professional gentleman."
        },
        {
          image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
          title: "Bridal Updo",
          description: "Elegant bridal updo with intricate braiding and romantic finishing touches."
        }
      ],
      reviews: [
        {
          clientName: "Michael Rodriguez",
          rating: 5,
          comment: "Alexander has been cutting my hair for 3 years. Always professional and delivers exactly what I want.",
          date: "December 12, 2024"
        },
        {
          clientName: "Jennifer Walsh",
          rating: 5,
          comment: "He did my wedding hair and it was absolutely perfect. Highly recommend!",
          date: "December 8, 2024"
        }
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["9:00 AM", "1:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: [] },
        { day: "Wednesday", date: "Jan 10", slots: ["10:00 AM", "2:00 PM", "5:00 PM"] },
        { day: "Thursday", date: "Jan 11", slots: ["11:00 AM"] }
      ]
    },
    {
      id: 3,
      name: "Sophia Chen",
      title: "Extension & Texture Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
      experience: 8,
      rating: 4.9,
      reviewCount: 89,
      startingPrice: 160,
      specialties: ["Hair Extensions", "Keratin Treatments", "Curly Hair", "Volume Enhancement"],
      bio: "Sophia specializes in extensions and texture treatments, helping clients achieve their dream hair goals.",
      fullBio: `Sophia Chen is our premier extension and texture specialist with 8 years of dedicated experience in hair enhancement techniques. She has mastered various extension methods including tape-in, micro-link, and hand-tied wefts, ensuring natural-looking results that blend seamlessly.\n\nHer expertise extends to texture treatments, particularly working with curly and textured hair. Sophia understands the unique needs of different hair types and creates customized treatment plans that enhance natural texture while maintaining hair health. She regularly attends advanced training sessions to stay current with the latest techniques and products.`,
      certifications: [
        "Certified Extension Specialist - Great Lengths",
        "Keratin Treatment Expert - Brazilian Blowout",
        "Curly Hair Specialist - DevaCurl Academy",
        "Hair Health & Restoration - Olaplex Professional"
      ],
      education: [
        "Extension Techniques Masterclass - Los Angeles",
        "Texture Treatment Specialist Course - Miami",
        "Curly Hair Science Workshop - Atlanta"
      ],
      portfolio: [
        {
          image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
          title: "Seamless Extensions",
          description: "Hand-tied weft extensions adding length and volume with perfect color matching."
        },
        {
          image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
          title: "Keratin Smoothing",
          description: "Professional keratin treatment for frizz control and enhanced shine."
        },
        {
          image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
          title: "Curly Hair Enhancement",
          description: "Specialized cut and treatment for natural curls, enhancing definition and bounce."
        }
      ],
      reviews: [
        {
          clientName: "Amanda Foster",
          rating: 5,
          comment: "Sophia gave me the most beautiful extensions! They look so natural and feel amazing.",
          date: "December 14, 2024"
        },
        {
          clientName: "Lisa Park",
          rating: 5,
          comment: "Finally found someone who understands curly hair! My curls have never looked better.",
          date: "December 11, 2024"
        }
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["11:00 AM", "3:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: ["10:00 AM", "2:00 PM"] },
        { day: "Wednesday", date: "Jan 10", slots: ["9:00 AM", "1:00 PM", "4:00 PM"] },
        { day: "Thursday", date: "Jan 11", slots: ["12:00 PM", "3:00 PM"] }
      ]
    },
    {
      id: 4,
      name: "Marcus Williams",
      title: "Men's Grooming Specialist",image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      experience: 10,
      rating: 4.7,
      reviewCount: 156,
      startingPrice: 85,
      specialties: ["Men\'s Cuts", "Beard Styling", "Classic Barbering", "Modern Fades"],
      bio: "Marcus brings traditional barbering skills with modern techniques for the contemporary gentleman.",
      fullBio: `Marcus Williams combines traditional barbering heritage with contemporary styling techniques, serving the modern gentleman for over 10 years. His expertise spans classic cuts, precision fades, and professional beard grooming, making him the go-to specialist for discerning male clientele.\n\nTrained in both traditional barbering and modern salon techniques, Marcus understands the importance of a well-groomed appearance in professional and personal settings. He takes pride in creating sharp, clean looks that enhance masculine features while maintaining practicality for busy lifestyles.`,
      certifications: [
        "Master Barber License - State Certified",
        "Men\'s Grooming Specialist - American Crew",
        "Beard & Mustache Styling Expert",
        "Classic Barbering Techniques - Traditional Academy"
      ],
      education: [
        "Traditional Barbering School - Chicago",
        "Modern Men\'s Styling Workshop - New York",
        "Beard Grooming Masterclass - Portland"
      ],
      portfolio: [
        {
          image: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=400&fit=crop",
          title: "Executive Business Cut",
          description: "Professional business cut with clean lines and sophisticated styling."
        },
        {
          image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop",
          title: "Modern Fade",
          description: "Contemporary fade cut with textured top for a modern, stylish look."
        },
        {
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
          title: "Beard Grooming",
          description: "Professional beard trimming and styling for the complete gentleman\'s look."
        }
      ],
      reviews: [
        {
          clientName: "David Thompson",
          rating: 5,
          comment: "Marcus always delivers a perfect cut. Professional service and great attention to detail.",
          date: "December 13, 2024"
        },
        {
          clientName: "Robert Kim",
          rating: 4,
          comment: "Great barber skills and friendly service. My go-to place for haircuts.",
          date: "December 9, 2024"
        }
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
        { day: "Wednesday", date: "Jan 10", slots: ["9:00 AM", "12:00 PM"] },
        { day: "Thursday", date: "Jan 11", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] }
      ]
    },
    {
      id: 5,
      name: "Elena Rodriguez",
      title: "Bridal & Special Events Stylist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
      experience: 9,
      rating: 4.9,
      reviewCount: 94,
      startingPrice: 200,
      specialties: ["Bridal Styling", "Updos", "Special Events", "Hair Accessories"],
      bio: "Elena creates magical bridal and special event looks that make every moment unforgettable.",
      fullBio: `Elena Rodriguez is our premier bridal and special events stylist, with 9 years of experience creating unforgettable looks for life's most important moments. Her artistic vision and attention to detail have made her the preferred choice for brides, bridesmaids, and special occasion styling.\n\nElena's approach combines classic elegance with contemporary trends, ensuring each client feels confident and beautiful. She offers comprehensive bridal packages including trials, wedding day styling, and touch-up services. Her expertise in working with various hair textures and incorporating accessories makes her versatile for any special event.`,
      certifications: [
        "Certified Bridal Hair Specialist",
        "Updo & Formal Styling Expert - Redken",
        "Hair Accessory Integration Specialist",
        "Special Events Styling Certification"
      ],
      education: [
        "Bridal Styling Academy - Las Vegas",
        "Formal Hair Design Workshop - Los Angeles",
        "Advanced Updo Techniques - New York"
      ],
      portfolio: [
        {
          image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
          title: "Classic Bridal Updo",
          description: "Timeless bridal updo with soft romantic curls and delicate hair accessories."
        },
        {
          image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop",
          title: "Bohemian Wedding Style",
          description: "Relaxed bohemian bridal style with braided elements and natural texture."
        },
        {
          image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop",
          title: "Elegant Evening Updo",
          description: "Sophisticated updo perfect for galas, proms, and formal events."
        }
      ],
      reviews: [
        {
          clientName: "Jessica Martinez",
          rating: 5,
          comment: "Elena made me feel like a princess on my wedding day! The style lasted all night perfectly.",
          date: "December 16, 2024"
        },
        {
          clientName: "Rachel Green",
          rating: 5,
          comment: "Amazing work for my prom! She really listened to what I wanted and made it even better.",
          date: "December 7, 2024"
        }
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: [] },
        { day: "Tuesday", date: "Jan 9", slots: ["10:00 AM", "2:00 PM"] },
        { day: "Wednesday", date: "Jan 10", slots: ["9:00 AM", "1:00 PM"] },
        { day: "Thursday", date: "Jan 11", slots: ["11:00 AM", "3:00 PM"] }
      ]
    },
    {
      id: 6,
      name: "James Mitchell",
      title: "Hair Health & Treatment Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
      experience: 11,
      rating: 4.8,
      reviewCount: 112,
      startingPrice: 140,
      specialties: ["Hair Treatments", "Scalp Care", "Hair Restoration", "Damage Repair"],
      bio: "James focuses on hair health and restoration, helping clients achieve their strongest, healthiest hair.",
      fullBio: `James Mitchell is our dedicated hair health and treatment specialist with 11 years of experience in hair restoration and scalp care. His scientific approach to hair health combines advanced treatments with personalized care plans to address various hair concerns including damage, thinning, and scalp issues.\n\nJames stays at the forefront of hair health technology, regularly training on the latest treatment methods and products. His holistic approach considers lifestyle factors, nutrition, and hair care routines to create comprehensive solutions for optimal hair health. Clients appreciate his thorough consultations and educational approach to hair care.`,
      certifications: [
        "Trichology Specialist Certification",
        "Olaplex Bond Building Expert",
        "Scalp Health & Analysis Specialist",
        "Hair Loss Treatment Consultant"
      ],
      education: [
        "Trichology Institute - Advanced Hair Science",
        "Scalp Health Specialist Course - International Academy",
        "Hair Restoration Techniques Workshop - Medical Hair Institute"
      ],
      portfolio: [
        {
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
          title: "Damage Repair Treatment",
          description: "Complete hair restoration from severely damaged to healthy, strong hair."
        },
        {
          image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop",
          title: "Scalp Health Improvement",
          description: "Scalp treatment program resulting in improved hair growth and health."
        },
        {
          image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop",
          title: "Bond Building Treatment",
          description: "Professional bond building treatment for chemically processed hair."
        }
      ],
      reviews: [
        {
          clientName: "Maria Santos",
          rating: 5,
          comment: "James saved my hair! After years of damage, he brought it back to life with his treatments.",
          date: "December 15, 2024"
        },
        {
          clientName: "Thomas Anderson",
          rating: 5,
          comment: "Professional and knowledgeable. His scalp treatments have made a huge difference.",
          date: "December 12, 2024"
        }
      ],
      availability: [
        { day: "Monday", date: "Jan 8", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] },
        { day: "Tuesday", date: "Jan 9", slots: ["10:00 AM", "1:00 PM"] },
        { day: "Wednesday", date: "Jan 10", slots: ["11:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Thursday", date: "Jan 11", slots: ["9:00 AM", "1:00 PM"] }
      ]
    }
  ];

  // Filter stylists based on selected criteria
  useEffect(() => {
    let filtered = stylists;

    if (selectedSpecialty !== 'all') {
      const specialtyMap = {
        'hair-color': ['Hair Color', 'Balayage', 'Color Correction', 'Highlights'],
        'hair-cuts': ['Precision Cuts', 'Men\'s Cuts', 'Hair Cuts'],
        'extensions': ['Hair Extensions', 'Volume Enhancement'],
        'bridal': ['Bridal', 'Bridal Styling', 'Special Events'],
        'treatments': ['Hair Treatments', 'Keratin Treatments', 'Scalp Care']
      };

      const targetSpecialties = specialtyMap?.[selectedSpecialty] || [];
      filtered = filtered?.filter(stylist =>
        stylist?.specialties?.some(specialty =>
          targetSpecialties?.some(target =>
            specialty?.toLowerCase()?.includes(target?.toLowerCase()) ||
            target?.toLowerCase()?.includes(specialty?.toLowerCase())
          )
        )
      );
    }

    if (selectedExperience !== 'all') {
      const minExperience = parseInt(selectedExperience?.replace('+', ''));
      filtered = filtered?.filter(stylist => stylist?.experience >= minExperience);
    }

    setFilteredStylists(filtered);
  }, [selectedSpecialty, selectedExperience]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (stylist) => {
    setSelectedStylist(stylist);
    setIsModalOpen(true);
  };

  const handleBookAppointment = (stylist) => {
    navigate('/appointment-booking', { 
      state: { 
        selectedStylist: stylist,
        preselectedService: stylist?.specialties?.[0]
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedSpecialty('all');
    setSelectedExperience('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedSpecialty !== 'all') count++;
    if (selectedExperience !== 'all') count++;
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
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover La Coiffure's talented team of luxury hair professionals. Each stylist brings unique expertise and artistry to create your perfect look with personalized attention and exceptional skill.
            </p>
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
                {isLoading ? 'Loading Stylists...' : `${filteredStylists?.length} Stylists Available`}
              </h2>
              {!isLoading && getActiveFiltersCount() > 0 && (
                <p className="text-muted-foreground mt-1">
                  Filtered by {selectedSpecialty !== 'all' && 'specialty'} 
                  {selectedSpecialty !== 'all' && selectedExperience !== 'all' && ' and '}
                  {selectedExperience !== 'all' && 'experience level'}
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
            Not sure which stylist is right for you? Our team can help match you with the perfect professional based on your hair goals, preferences, and desired services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact-location')}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-luxury flex items-center justify-center space-x-2"
            >
              <Icon name="MessageCircle" size={20} />
              <span>Get Consultation</span>
            </button>
            <button
              onClick={() => navigate('/appointment-booking')}
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