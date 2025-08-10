import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 'all', label: 'All Products', icon: 'Grid' },
    { id: 'shampoo', label: 'Shampoos', icon: 'Droplets' },
    { id: 'conditioner', label: 'Conditioners', icon: 'Zap' },
    { id: 'treatment', label: 'Hair Treatments', icon: 'Flask' },
    { id: 'styling', label: 'Styling Products', icon: 'Scissors' },
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
      ingredients: ["Silicones", "Proteins", "Antioxidants", "UV Protection"],
      size: "200ml",
      benefits: ["Heat Protection", "UV Shield", "Damage Prevention", "Lightweight"]
    },
    {
      id: 6,
      name: "La Coiffure Hair Brush Set",
      description: "Professional hair brush set designed for different hair types and styling needs.",
      price: 45.00,
      originalPrice: 60.00,
      category: 'accessories',
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 78,
      inStock: true,
      featured: false,
      bestSeller: false,
      ingredients: ["Natural Bristles", "Wooden Handles", "Ergonomic Design"],
      size: "3-piece set",
      benefits: ["Gentle Detangling", "Volume Enhancement", "Smooth Finish"]
    },
    {
      id: 7,
      name: "La Coiffure Deep Conditioning Mask",
      description: "Weekly deep conditioning mask for intense hydration and repair.",
      price: 38.00,
      originalPrice: 48.00,
      category: 'treatment',
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 92,
      inStock: true,
      featured: false,
      bestSeller: false,
      ingredients: ["Hyaluronic Acid", "Ceramides", "Natural Oils", "Proteins"],
      size: "200ml",
      benefits: ["Intense Hydration", "Damage Repair", "Smooth Texture", "Weekly Treatment"]
    },
    {
      id: 8,
      name: "La Coiffure Color-Safe Shampoo",
      description: "Sulfate-free shampoo specifically formulated to preserve hair color and vibrancy.",
      price: 30.00,
      originalPrice: 38.00,
      category: 'shampoo',
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 145,
      inStock: true,
      featured: false,
      bestSeller: true,
      ingredients: ["Sulfate-Free", "Color-Lock Technology", "Natural Extracts", "Antioxidants"],
      size: "250ml",
      benefits: ["Color Preservation", "Gentle Cleansing", "Vibrancy Protection", "Moisture Balance"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(product => product.featured);
  const bestSellers = products.filter(product => product.bestSeller);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Load products
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
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
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our exclusive line of La Coiffure Salon premium hair care products, crafted with the finest ingredients for professional results at home.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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

          {/* Featured Products */}
          {selectedCategory === 'all' && featuredProducts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map(product => (
                  <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-luxury transition-luxury">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {product.bestSeller && (
                        <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                          Best Seller
                        </div>
                      )}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                          {product.category.replace('-', ' ')}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span className="text-xs text-muted-foreground">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{product.size}</span>
                      </div>
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Products */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              {selectedCategory === 'all' ? 'All Products' : `${categories.find(c => c.id === selectedCategory)?.label}`}
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-luxury transition-luxury">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {product.bestSeller && (
                        <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                          Best Seller
                        </div>
                      )}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                          {product.category.replace('-', ' ')}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span className="text-xs text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{product.size}</span>
                      </div>
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
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
    </div>
  );
};

export default Products;


