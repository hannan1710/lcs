import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ServiceCard from './components/ServiceCard';
import CategoryFilter from './components/CategoryFilter';
import ServiceModal from './components/ServiceModal';
import SearchBar from './components/SearchBar';
import Breadcrumb from './components/Breadcrumb';
import Icon from '../../components/AppIcon';
import { useService } from '../../contexts/ServiceContext';
import { useCategory } from '../../contexts/CategoryContext';

const ServicesCatalog = () => {
  const navigate = useNavigate();
  const { services } = useService();
  const { categories } = useCategory();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fallback mock data for services (if context is empty)
  const mockServices = [
    {
      id: 1,
      name: "Signature Hair Cut & Style",
      category: "hair",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      duration: "90 min",
      rating: 4.9,
      reviewCount: 127,
      description: "Premium precision cut with personalized styling consultation and luxury finishing.",
      fullDescription: `Experience our signature hair cutting service that combines precision technique with artistic vision. Our master stylists begin with a comprehensive consultation to understand your lifestyle, face shape, and personal style preferences.\n\nUsing advanced cutting techniques and premium tools, we create a customized look that enhances your natural beauty while being easy to maintain at home.`,
      includes: [
        "Detailed consultation and hair analysis",
        "Precision cut with advanced techniques",
        "Personalized styling session",
        "Premium product application",
        "Styling tips and maintenance advice"
      ],
      recommendedStylists: [
        { name: "Isabella Martinez", specialty: "Precision Cuts", avatar: "https://randomuser.me/api/portraits/women/32.jpg", rating: 4.9 },
        { name: "James Wilson", specialty: "Modern Styles", avatar: "https://randomuser.me/api/portraits/men/45.jpg", rating: 4.8 }
      ],
      preparation: [
        "Come with clean, dry hair for best results",
        "Bring reference photos if you have a specific style in mind",
        "Avoid using heavy styling products before your appointment"
      ],
      beforeAfter: [
        { image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=150&fit=crop", label: "Before" },
        { image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop", label: "After" }
      ]
    },
    {
      id: 2,
      name: "Balayage Color Treatment",
      category: "color",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      duration: "3-4 hours",
      rating: 4.8,
      reviewCount: 89,
      description: "Hand-painted highlights for natural, sun-kissed dimension with premium color products.",
      fullDescription: `Transform your hair with our expert balayage technique, creating natural-looking highlights that grow out beautifully. Our colorists hand-paint each section to create dimension and movement that complements your skin tone and personal style.\n\nUsing only premium, ammonia-free color products, we ensure your hair remains healthy while achieving stunning results that last.`,
      includes: [
        "Color consultation and strand test",
        "Hand-painted balayage application",
        "Toning service for perfect shade",
        "Deep conditioning treatment",
        "Color maintenance guidance"
      ],
      recommendedStylists: [
        { name: "Sophie Chen", specialty: "Color Specialist", avatar: "https://randomuser.me/api/portraits/women/28.jpg", rating: 4.9 },
        { name: "Marcus Thompson", specialty: "Balayage Expert", avatar: "https://randomuser.me/api/portraits/men/38.jpg", rating: 4.8 }
      ],
      preparation: [
        "Avoid washing hair 24-48 hours before appointment",
        "Come with hair free of heavy styling products",
        "Discuss any previous color treatments during consultation"
      ],
      beforeAfter: [
        { image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=150&fit=crop", label: "Before" },
        { image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=150&fit=crop", label: "After" }
      ]
    },
    {
      id: 3,
      name: "Bridal Hair & Makeup",
      category: "styling",
      image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop",
      duration: "4-5 hours",
      rating: 5.0,
      reviewCount: 156,
      description: "Complete bridal beauty package with trial session and wedding day styling.",
      fullDescription: `Make your special day perfect with our comprehensive bridal beauty package. We begin with a detailed consultation and trial session to create your dream look, ensuring everything is flawless for your wedding day.\n\nOur experienced bridal team specializes in long-lasting styles that photograph beautifully and withstand the emotions of your special day.`,
      includes: [
        "Bridal consultation and planning",
        "Complete trial session",
        "Wedding day hair styling",
        "Professional makeup application",
        "Touch-up kit for the day"
      ],
      recommendedStylists: [
        { name: "Victoria Rose", specialty: "Bridal Specialist", avatar: "https://randomuser.me/api/portraits/women/35.jpg", rating: 5.0 },
        { name: "Elena Dubois", specialty: "Wedding Makeup", avatar: "https://randomuser.me/api/portraits/women/42.jpg", rating: 4.9 }
      ],
      preparation: [
        "Schedule trial 4-6 weeks before wedding",
        "Bring inspiration photos and accessories",
        "Complete skincare routine 2 weeks prior"
      ],
      beforeAfter: [
        { image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=150&fit=crop", label: "Before" },
        { image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=200&h=150&fit=crop", label: "After" }
      ]
    },
    {
      id: 4,
      name: "Keratin Smoothing Treatment",
      category: "treatments",
      image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop",
      duration: "2-3 hours",
      rating: 4.7,
      reviewCount: 94,
      description: "Professional smoothing treatment for frizz-free, manageable hair that lasts months.",
      fullDescription: `Transform unruly, frizzy hair into smooth, manageable locks with our professional keratin treatment. This revolutionary service reduces styling time by up to 50% while adding incredible shine and eliminating frizz.\n\nOur formaldehyde-free formula is safe for all hair types and provides long-lasting results that improve hair health over time.`,
      includes: [
        "Hair analysis and consultation",
        "Deep cleansing shampoo",
        "Keratin treatment application",
        "Professional blow-dry and styling",
        "Aftercare product recommendations"
      ],
      recommendedStylists: [
        { name: "Maria Santos", specialty: "Chemical Services", avatar: "https://randomuser.me/api/portraits/women/29.jpg", rating: 4.8 },
        { name: "David Kim", specialty: "Hair Treatments", avatar: "https://randomuser.me/api/portraits/men/33.jpg", rating: 4.7 }
      ],
      preparation: [
        "Avoid washing hair 24 hours before treatment",
        "Remove all styling products completely",
        "Plan for 72-hour no-wash period after treatment"
      ],
      beforeAfter: [
        { image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=150&fit=crop", label: "Before" },
        { image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=200&h=150&fit=crop", label: "After" }
      ]
    },
    {
      id: 5,
      name: "Luxury Facial Treatment",
      category: "spa",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
      duration: "75 min",
      rating: 4.9,
      reviewCount: 112,
      description: "Customized facial treatment with premium products for radiant, healthy skin.",
      fullDescription: `Indulge in our signature facial treatment designed to address your specific skin concerns while providing ultimate relaxation. Our licensed estheticians use only the finest products and advanced techniques to reveal your skin's natural radiance.\n\nEach treatment is customized based on a thorough skin analysis, ensuring optimal results for your unique skin type and concerns.`,
      includes: [
        "Comprehensive skin analysis",
        "Deep cleansing and exfoliation",
        "Customized mask application",
        "Relaxing facial massage",
        "Moisturizing and sun protection"
      ],
      recommendedStylists: [
        { name: "Amanda Foster", specialty: "Licensed Esthetician", avatar: "https://randomuser.me/api/portraits/women/31.jpg", rating: 4.9 },
        { name: "Rachel Green", specialty: "Skincare Specialist", avatar: "https://randomuser.me/api/portraits/women/26.jpg", rating: 4.8 }
      ],
      preparation: [
        "Avoid sun exposure 24 hours before treatment",
        "Remove all makeup before arrival",
        "Inform us of any skin sensitivities or allergies"
      ],
      beforeAfter: [
        { image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=150&fit=crop", label: "Before" },
        { image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=150&fit=crop", label: "After" }
      ]
    },
    {
      id: 6,
      name: "Men\'s Executive Cut",
      category: "hair",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
      duration: "45 min",
      rating: 4.8,
      reviewCount: 78,
      description: "Professional men\'s haircut with hot towel treatment and styling for the modern gentleman.",
      fullDescription: `Experience the ultimate in men's grooming with our executive haircut service. Designed for the modern professional, this service combines precision cutting with traditional barbering techniques for a sophisticated finish.\n\nEnjoy the luxury of hot towel treatments, premium grooming products, and expert styling that keeps you looking sharp for weeks.`,
      includes: [
        "Consultation and style planning",
        "Precision haircut with professional tools",
        "Hot towel treatment",
        "Scalp massage",
        "Professional styling and finishing"
      ],
      recommendedStylists: [
        { name: "Antonio Rodriguez", specialty: "Men\'s Grooming", avatar: "https://randomuser.me/api/portraits/men/41.jpg", rating: 4.9 },
        { name: "Michael Chen", specialty: "Executive Cuts", avatar: "https://randomuser.me/api/portraits/men/36.jpg", rating: 4.8 }
      ],
      preparation: [
        "Come with clean, towel-dried hair",
        "Bring reference photos if desired",
        "Discuss your daily styling routine"
      ],
      beforeAfter: [
        { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop", label: "Before" },
        { image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=150&fit=crop", label: "After" }
      ]
    }
  ];

  // Categories with service counts
  const categoriesWithCounts = useMemo(() => {
    const servicesToUse = services || [];
    return [
      { id: 'all', name: 'All Services', icon: 'Grid3X3', count: servicesToUse?.length },
      ...categories.map(category => ({
        ...category,
        count: servicesToUse?.filter(s => s?.category === category.id)?.length
      }))
    ];
  }, [services, categories]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter services based on category and search term
  const filteredServices = useMemo(() => {
    const servicesToUse = services || [];
    console.log('ServicesCatalog - services:', services);
    console.log('ServicesCatalog - servicesToUse:', servicesToUse);
    console.log('ServicesCatalog - activeCategory:', activeCategory);
    console.log('ServicesCatalog - searchTerm:', searchTerm);
    let filtered = servicesToUse;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(service => service?.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered?.filter(service =>
        service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    console.log('ServicesCatalog - final filtered result:', filtered);
    return filtered;
  }, [services, activeCategory, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookNow = (service) => {
    navigate('/appointment-booking', { state: { selectedService: service } });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const getCurrentCategoryName = () => {
    const category = categoriesWithCounts?.find(cat => cat?.id === activeCategory);
    return category && category?.id !== 'all' ? category?.name : null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <Breadcrumb category={getCurrentCategoryName()} />
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Our Premium Services
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our comprehensive range of luxury beauty and wellness services, 
              crafted by expert stylists using premium products and techniques.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Desktop Sidebar Filter */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <CategoryFilter
                  categories={categoriesWithCounts}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  isMobile={false}
                />
              </div>
            )}

            {/* Main Content */}
            <div className={`${!isMobile ? 'lg:col-span-3' : ''}`}>
              {/* Mobile Category Filter */}
              {isMobile && (
                <CategoryFilter
                  categories={categoriesWithCounts}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  isMobile={true}
                />
              )}

              {/* Search Bar */}
              <div className="px-6 lg:px-0">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  placeholder="Search services, treatments, or stylists..."
                />
              </div>

              {/* Results Count */}
              <div className="px-6 lg:px-0 mb-6">
                <p className="text-muted-foreground text-sm">
                  Showing {filteredServices?.length} service{filteredServices?.length !== 1 ? 's' : ''}
                  {activeCategory !== 'all' && ` in ${getCurrentCategoryName()}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>

              {/* Services Grid */}
              {filteredServices?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-6 lg:px-0">
                  {filteredServices?.map((service) => (
                    <ServiceCard
                      key={service?.id}
                      service={service}
                      onViewDetails={handleViewDetails}
                      onBookNow={handleBookNow}
                      categories={categories}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-6 lg:px-0">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    No services found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                    className="text-accent hover:text-accent/80 font-medium transition-luxury"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookNow={handleBookNow}
      />
    </div>
  );
};

export default ServicesCatalog;