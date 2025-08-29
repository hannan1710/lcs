import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { productsAPI } from '../../services/api';

// Lightweight product detail modal to preview images and information
const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, onBuyNow }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  if (!isOpen || !product) return null;
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">{product.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{product.category} • {product.size}</p>
          </div>
          <button onClick={onClose} className="px-2 py-1 rounded-md border border-border hover:bg-muted">
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Image viewer */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
              <img src={images[activeImageIdx]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-md overflow-hidden border ${idx === activeImageIdx ? 'border-accent' : 'border-border'}`}
                  >
                    <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{product.description}</p>
            {Array.isArray(product.benefits) && product.benefits.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Benefits</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.benefits.map((b, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">{b}</span>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Ingredients</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{ing}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="space-x-2">
            <span className="font-heading text-lg text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="px-3 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 text-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onBuyNow(product)}
              className="px-3 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground text-sm"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [justAdded, setJustAdded] = useState({});
  const [sortBy, setSortBy] = useState('featured');
  // Navigate to detail page on card click
  const openDetail = (product) => {
    const idStr = product?.id ?? '';
    navigate(`/products/${idStr}`);
  };

  const categories = [
    { id: 'all', label: 'All', icon: 'Grid' },
    { id: 'shampoo', label: 'Shampoo', icon: 'Droplets' },
    { id: 'conditioner', label: 'Conditioner', icon: 'Zap' },
    { id: 'treatment', label: 'Treatment', icon: 'Flask' },
    { id: 'styling', label: 'Styling', icon: 'Scissors' },
    { id: 'accessories', label: 'Accessories', icon: 'Package' }
  ];

  const productData = [
    {
      id: 1,
      name: "La Coiffure Luxury Shampoo",
      description: "Premium salon-grade shampoo enriched with argan oil and keratin for deep cleansing and nourishment.",
      price: 28.00,
      originalPrice: 35.00,
      category: 'shampoo',
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true,
      bestSeller: true,
      ingredients: ["Argan Oil", "Keratin", "Vitamin E", "Natural Extracts"],
      size: "250ml",
      benefits: ["Deep Cleansing", "Strengthening", "Nourishing", "Color Safe"]
    },
    {
      id: 2,
      name: "La Coiffure Nourishing Conditioner",
      description: "Intensive conditioning treatment that restores moisture and leaves hair silky smooth.",
      price: 32.00,
      originalPrice: 40.00,
      category: 'conditioner',
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      featured: true,
      bestSeller: false,
      ingredients: ["Shea Butter", "Coconut Oil", "Proteins", "Natural Oils"],
      size: "250ml",
      benefits: ["Intensive Moisture", "Detangling", "Smooth Texture", "Long-lasting"]
    },
    {
      id: 3,
      name: "La Coiffure Keratin Treatment",
      description: "Professional-grade keratin treatment for smooth, frizz-free hair with lasting results.",
      price: 85.00,
      originalPrice: 120.00,
      category: 'treatment',
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 67,
      inStock: true,
      featured: true,
      bestSeller: false,
      ingredients: ["Keratin", "Natural Proteins", "Vitamins", "Antioxidants"],
      size: "200ml",
      benefits: ["Frizz Control", "Smoothing", "Damage Repair", "Heat Protection"]
    },
    {
      id: 4,
      name: "La Coiffure Styling Gel",
      description: "Professional styling gel that provides strong hold while maintaining natural movement.",
      price: 24.00,
      originalPrice: 30.00,
      category: 'styling',
      image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      featured: false,
      bestSeller: true,
      ingredients: ["Natural Polymers", "Aloe Vera", "Vitamin B5", "Moisturizers"],
      size: "150ml",
      benefits: ["Strong Hold", "Natural Look", "No Residue", "Easy Wash Out"]
    },
    {
      id: 5,
      name: "La Coiffure Heat Protection Spray",
      description: "Advanced heat protection spray that shields hair from damage up to 450°F.",
      price: 35.00,
      originalPrice: 45.00,
      category: 'styling',
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 203,
      inStock: true,
      featured: false,
      bestSeller: true,
      ingredients: ["Silicones", "Proteins", "Vitamins", "UV Protection"],
      size: "200ml",
      benefits: ["Heat Protection", "UV Shield", "Smoothing", "Damage Prevention"]
    },
    {
      id: 6,
      name: "La Coiffure Hair Brush Set",
      description: "Professional hair brush set with different bristle types for various hair textures and styling needs.",
      price: 45.00,
      originalPrice: 60.00,
      category: 'accessories',
      image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 78,
      inStock: true,
      featured: false,
      bestSeller: false,
      ingredients: ["Natural Bristles", "Wooden Handles", "Anti-static Coating"],
      size: "Set of 3",
      benefits: ["Gentle Detangling", "Volume Building", "Smooth Finish", "Anti-static"]
    }
  ];

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Debug: Log current selection and filtered results
  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Products Count:', filteredProducts.length);
  console.log('All Products Count:', products.length);

  // Get featured products
  const featuredProducts = products.filter(product => product.featured);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.featured - a.featured;
    }
  });

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show "Added!" feedback
    setJustAdded({ ...justAdded, [product.id]: true });
    setTimeout(() => {
      setJustAdded({ ...justAdded, [product.id]: false });
    }, 2000);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const buyNow = (product) => {
    const bookingData = {
      selectedService: { name: product.name, price: product.price },
      selectedStylist: { name: 'Online Purchase' },
      selectedDate: new Date().toISOString().split('T')[0],
      selectedTime: '',
      formData: { firstName: 'Guest', lastName: 'Customer' }
    };
    navigate('/payment', { state: { bookingData, productCheckout: true } });
  };

  // Load products and cart
  useEffect(() => {
    const load = async () => {
      try {
        const [apiProducts] = await Promise.all([
          productsAPI.getAll().catch(() => null)
        ]);
        if (Array.isArray(apiProducts) && apiProducts.length) {
          setProducts(apiProducts);
        } else {
          setProducts(productData);
        }
      } catch {
        setProducts(productData);
      } finally {
        setLoading(false);
      }
    };
    // load cart from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('cart') || '[]');
      if (Array.isArray(saved)) setCart(saved);
    } catch {}
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Icon name="Loader" size={48} className="animate-spin text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Loading our products...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Products
              </h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg bg-card border border-border">
                  <Icon name="Filter" size={20} />
                </button>
                <button className="p-2 rounded-lg bg-card border border-border">
                  <Icon name="Grid" size={20} />
                </button>
              </div>
            </div>
            
            {/* Mobile Search Bar */}
            <div className="relative mb-4">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Mobile Filter Buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-1.5 overflow-x-auto pb-2 w-full">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      console.log('Category clicked:', category.id);
                      setSelectedCategory(category.id);
                    }}
                    className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-luxury flex-shrink-0 min-w-fit ${
                      selectedCategory === category.id
                        ? 'bg-accent text-accent-foreground shadow-sm'
                        : 'bg-card border border-border text-muted-foreground hover:bg-accent/10 hover:text-accent active:bg-accent/20'
                    }`}
                  >
                    <Icon name={category.icon} size={12} />
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sort Dropdown */}
            <div className="flex items-center justify-between mb-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our exclusive line of La Coiffure Salon premium hair care products, crafted with the finest ingredients for professional results at home.
              </p>
            </div>

            {/* Desktop Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-luxury ${
                        selectedCategory === category.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                    >
                      <Icon name={category.icon} size={16} />
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Products Banner - Mobile */}
          {selectedCategory === 'all' && featuredProducts.length > 0 && (
            <div className="lg:hidden mb-6">
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4 border border-accent/20">
                <h2 className="text-lg font-heading font-bold text-foreground mb-2">Featured Products</h2>
                <p className="text-sm text-muted-foreground">Our most popular and highly-rated products</p>
              </div>
            </div>
          )}

          {/* Featured Products - Desktop */}
          {selectedCategory === 'all' && featuredProducts.length > 0 && (
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Featured Products</h2>
            </div>
          )}

          {/* Products Grid */}
          <div>
            {selectedCategory !== 'all' && (
              <div className="mb-4 lg:mb-6">
                <h2 className="text-lg lg:text-2xl font-heading font-bold text-foreground">
                  {categories.find(c => c.id === selectedCategory)?.label}
                </h2>
              </div>
            )}
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-luxury transition-luxury group">
                    <div className="relative cursor-pointer" onClick={() => openDetail(product)}>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={product.image || (product.images && product.images[0])}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.bestSeller && (
                          <div className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                            Best Seller
                          </div>
                        )}
                        {product.featured && (
                          <div className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {calculateDiscount(product.originalPrice, product.price)}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      {/* Category and Rating */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span className="text-xs text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                      
                      {/* Product Name */}
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 line-clamp-2 cursor-pointer" onClick={() => openDetail(product)}>{product.name}</h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm sm:text-base font-bold text-foreground">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs sm:text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{product.size}</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button
                          onClick={(e) => { e.stopPropagation(); addToCart({ ...product, image: product.image || (product.images && product.images[0]) }); }}
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm"
                          disabled={!product.inStock}
                          size="sm"
                        >
                          {product.inStock ? (justAdded[product.id] ? 'Added!' : 'Add to Cart') : 'Out of Stock'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => { e.stopPropagation(); buyNow({ ...product, image: product.image || (product.images && product.images[0]) }); }}
                          size="sm"
                          disabled={!product.inStock}
                          className="w-full text-xs sm:text-sm"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Detail modal removed in favor of dedicated route */}
    </div>
  );
};

export default Products;


