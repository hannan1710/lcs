const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
// Increase body size limit to allow base64 images for multi-photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mock data storage
let appointments = [
  {
    id: 1,
    client: 'Sarah Johnson',
    service: 'Hair Cut & Style',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    stylist: 'Emma Rodriguez',
    price: 150
  },
  {
    id: 2,
    client: 'Emily Davis',
    service: 'Color Treatment',
    date: '2024-01-15',
    time: '2:00 PM',
    status: 'pending',
    stylist: 'David Chen',
    price: 250
  },
  {
    id: 3,
    client: 'Michael Brown',
    service: 'Men\'s Grooming',
    date: '2024-01-16',
    time: '11:30 AM',
    status: 'confirmed',
    stylist: 'James Wilson',
    price: 85
  },
  {
    id: 4,
    client: 'Lisa Wilson',
    service: 'Bridal Package',
    date: '2024-01-16',
    time: '9:00 AM',
    status: 'confirmed',
    stylist: 'Sophia Martinez',
    price: 450
  }
];

// Admin users storage
let admins = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@lacoiffuresalon.com',
    role: 'super_admin',
    createdAt: '2024-01-01',
    lastLogin: null
  },
  {
    id: 2,
    username: 'lacoiffure',
    password: 'orhan110',
    email: 'admin@lacoiffuresalon.in',
    role: 'admin',
    createdAt: '2024-01-01',
    lastLogin: null
  },
  {
    id: 3,
    username: 'hannan',
    password: 'a.hannan123',
    email: 'hannan@lacoiffuresalon.in',
    role: 'super_admin',
    createdAt: '2024-01-01',
    lastLogin: null
  },
  {
    id: 4,
    username: 'imran',
    password: 'imran123',
    email: 'imran@lacoiffuresalon.in',
    role: 'super_admin',
    createdAt: '2024-01-01',
    lastLogin: null
  }
];

let services = [
  {
    id: 1,
    name: 'Signature Hair Cut & Style',
    price: 150,
    duration: '90 min',
    category: 'Hair',
    status: 'active',
    description: 'Premium precision cut with personalized styling consultation and luxury finish',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    name: 'Premium Color Treatment',
    price: 250,
    duration: '3 hours',
    category: 'Color',
    status: 'active',
    description: 'Advanced color techniques including balayage, highlights, and full color transformations',
    image: 'https://images.pixabay.com/photos/2016/03/26/22/13/woman-1281826_960_720.jpg'
  },
  {
    id: 3,
    name: 'Luxury Facial Treatment',
    price: 120,
    duration: '75 min',
    category: 'Skincare',
    status: 'active',
    description: 'Rejuvenating facial treatments with premium skincare products',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Bridal Beauty Package',
    price: 450,
    duration: '4 hours',
    category: 'Bridal',
    status: 'active',
    description: 'Complete bridal preparation including hair styling, makeup application, and skincare treatments',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

let stylists = [
  {
    id: 1,
    name: 'Emma Rodriguez',
    specialty: 'Color Specialist',
    experience: '8 years',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: 2,
    name: 'David Chen',
    specialty: 'Cutting Expert',
    experience: '12 years',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    specialty: 'Styling Specialist',
    experience: '6 years',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 4,
    name: 'James Wilson',
    specialty: 'Men\'s Grooming',
    experience: '10 years',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 203
  }
];

let clients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    joinDate: '2023-01-15',
    totalSpent: 1250,
    appointmentsCount: 8
  },
  {
    id: 2,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 234-5678',
    joinDate: '2023-03-22',
    totalSpent: 890,
    appointmentsCount: 5
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
    joinDate: '2023-02-10',
    totalSpent: 425,
    appointmentsCount: 3
  }
];

let blogPosts = [
  {
    id: 1,
    title: 'Summer Hair Care Tips for Healthy Locks',
    excerpt: 'Discover the best practices for maintaining healthy hair during the summer months.',
    content: 'Summer can be harsh on your hair...',
    author: 'Emma Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    publishDate: '2024-01-10',
    category: 'hair-care',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Latest Hair Color Trends for 2024',
    excerpt: 'Explore the hottest hair color trends that will dominate this year.',
    content: '2024 brings exciting new color trends...',
    author: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    publishDate: '2024-01-08',
    category: 'trends',
    image: 'https://images.pixabay.com/photos/2016/03/26/22/13/woman-1281826_960_720.jpg',
    readTime: '7 min read'
  }
];

let products = [
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

let settings = {
  salonName: 'La Coiffure Luxury Salon',
  phone: '(555) 123-4567',
  email: 'info@lacoiffure.com',
  address: '123 Luxury Avenue, Beverly Hills, CA 90210',
  openingTime: '09:00',
  closingTime: '20:00'
};

// Payment data storage
let payments = [
  {
    id: 1,
    transactionId: 'TXN_1705123456789',
    amount: 150,
    currency: 'USD',
    method: 'card',
    status: 'completed',
    date: '2024-01-15T10:00:00Z',
    clientId: 1,
    appointmentId: 1,
    service: 'Hair Cut & Style',
    cardLast4: '1234',
    cardBrand: 'Visa'
  },
  {
    id: 2,
    transactionId: 'TXN_1705034567890',
    amount: 250,
    currency: 'USD',
    method: 'paypal',
    status: 'completed',
    date: '2024-01-10T14:00:00Z',
    clientId: 2,
    appointmentId: 2,
    service: 'Color Treatment',
    paypalEmail: 'client@example.com'
  }
];

let giftCards = [
  {
    id: 1,
    code: 'WELCOME50',
    amount: 50,
    remainingAmount: 50,
    isActive: true,
    expiryDate: '2024-12-31',
    usedBy: null
  },
  {
    id: 2,
    code: 'LOYALTY25',
    amount: 25,
    remainingAmount: 25,
    isActive: true,
    expiryDate: '2024-12-31',
    usedBy: null
  }
];

// Payment validation functions
const validateCardData = (cardData) => {
  const errors = [];
  
  // Validate card number (Luhn algorithm)
  const cardNumber = cardData.number.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cardNumber)) {
    errors.push('Invalid card number');
  } else {
    // Luhn algorithm check
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    if (sum % 10 !== 0) {
      errors.push('Invalid card number');
    }
  }
  
  // Validate expiry date
  const [month, year] = cardData.expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (parseInt(month) < 1 || parseInt(month) > 12) {
    errors.push('Invalid expiry month');
  }
  if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    errors.push('Card has expired');
  }
  
  // Validate CVV
  if (!/^\d{3,4}$/.test(cardData.cvv)) {
    errors.push('Invalid CVV');
  }
  
  // Validate cardholder name
  if (!cardData.name.trim() || cardData.name.trim().length < 2) {
    errors.push('Invalid cardholder name');
  }
  
  // Validate ZIP code
  if (!/^\d{5}$/.test(cardData.zipCode)) {
    errors.push('Invalid ZIP code');
  }
  
  return errors;
};

const validateGiftCard = (code) => {
  const giftCard = giftCards.find(gc => gc.code === code && gc.isActive);
  if (!giftCard) {
    return { valid: false, error: 'Invalid or expired gift card code' };
  }
  
  const currentDate = new Date();
  const expiryDate = new Date(giftCard.expiryDate);
  
  if (currentDate > expiryDate) {
    return { valid: false, error: 'Gift card has expired' };
  }
  
  if (giftCard.remainingAmount <= 0) {
    return { valid: false, error: 'Gift card has no remaining balance' };
  }
  
  return { valid: true, giftCard };
};

const processCardPayment = async (paymentData) => {
  // Simulate card payment processing
  const { cardData, amount } = paymentData;
  
  // Validate card data
  const validationErrors = validateCardData(cardData);
  if (validationErrors.length > 0) {
    throw new Error(`Card validation failed: ${validationErrors.join(', ')}`);
  }
  
  // Simulate payment gateway processing
  const processingResult = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        resolve({
          success: true,
          transactionId: `TXN_${Date.now()}`,
          amount,
          status: 'completed',
          cardLast4: cardData.number.slice(-4),
          cardBrand: getCardBrand(cardData.number)
        });
      } else {
        reject(new Error('Payment declined by bank'));
      }
    }, 2000);
  });
  
  return processingResult;
};

const processPayPalPayment = async (paymentData) => {
  // Simulate PayPal payment processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `PP_${Date.now()}`,
        amount: paymentData.amount,
        status: 'completed',
        method: 'paypal'
      });
    }, 1500);
  });
};

const processApplePayPayment = async (paymentData) => {
  // Simulate Apple Pay payment processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `AP_${Date.now()}`,
        amount: paymentData.amount,
        status: 'completed',
        method: 'apple-pay'
      });
    }, 1000);
  });
};

const processGiftCardPayment = async (paymentData) => {
  const { giftCardCode, amount } = paymentData;
  
  // Validate gift card
  const validation = validateGiftCard(giftCardCode);
  if (!validation.valid) {
    throw new Error(validation.error);
  }
  
  const giftCard = validation.giftCard;
  
  // Check if gift card has sufficient balance
  if (giftCard.remainingAmount < amount) {
    throw new Error(`Insufficient gift card balance. Available: $${giftCard.remainingAmount}`);
  }
  
  // Process gift card payment
  return new Promise((resolve) => {
    setTimeout(() => {
      // Update gift card balance
      giftCard.remainingAmount -= amount;
      giftCard.usedBy = paymentData.clientId;
      
      resolve({
        success: true,
        transactionId: `GC_${Date.now()}`,
        amount,
        status: 'completed',
        method: 'gift-card',
        giftCardCode,
        remainingBalance: giftCard.remainingAmount
      });
    }, 500);
  });
};

const getCardBrand = (cardNumber) => {
  const number = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(number)) return 'Visa';
  if (/^5[1-5]/.test(number)) return 'Mastercard';
  if (/^3[47]/.test(number)) return 'American Express';
  if (/^6/.test(number)) return 'Discover';
  
  return 'Unknown';
};

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication
  if (email === 'user@example.com' && password === 'password123') {
    res.json({
      success: true,
      user: {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'client'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const userData = req.body;
  
  // Mock registration
  res.json({
    success: true,
    user: {
      id: Date.now(),
      ...userData,
      role: 'client'
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/admin-login', (req, res) => {
  const { username, password, email } = req.body;
  
  // Find admin by username OR email (supports passing email in the username field)
  const admin = admins.find(a => a.username === username || a.email === username || a.email === email);
  
  if (admin && admin.password === password) {
    // Update last login time
    admin.lastLogin = new Date().toISOString();
    
    res.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      token: 'mock-admin-jwt-token'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  // In a real application, you would invalidate the JWT token
  // For this mock server, we just return success
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Admin management endpoints
app.get('/api/admin/users', (req, res) => {
  // Return admins without passwords for security
  const adminUsers = admins.map(admin => ({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
    lastLogin: admin.lastLogin
  }));
  res.json(adminUsers);
});

app.post('/api/admin/users', (req, res) => {
  const { username, password, email, role = 'admin' } = req.body;
  
  // Check if username already exists
  if (admins.find(a => a.username === username)) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }
  
  // Check if email already exists
  if (admins.find(a => a.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }
  
  const newAdmin = {
    id: Date.now(),
    username,
    password, // In production, this should be hashed
    email,
    role,
    createdAt: new Date().toISOString(),
    lastLogin: null
  };
  
  admins.push(newAdmin);
  res.json({
    success: true,
    user: {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      createdAt: newAdmin.createdAt
    }
  });
});

app.put('/api/admin/users/:id', (req, res) => {
  const adminId = parseInt(req.params.id);
  const { username, email, role } = req.body;
  
  const adminIndex = admins.findIndex(a => a.id === adminId);
  if (adminIndex === -1) {
    return res.status(404).json({ success: false, message: 'Admin not found' });
  }
  
  // Check if username already exists (excluding current admin)
  if (username && admins.find(a => a.username === username && a.id !== adminId)) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }
  
  // Check if email already exists (excluding current admin)
  if (email && admins.find(a => a.email === email && a.id !== adminId)) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }
  
  admins[adminIndex] = {
    ...admins[adminIndex],
    username: username || admins[adminIndex].username,
    email: email || admins[adminIndex].email,
    role: role || admins[adminIndex].role
  };
  
  res.json({
    success: true,
    user: {
      id: admins[adminIndex].id,
      username: admins[adminIndex].username,
      email: admins[adminIndex].email,
      role: admins[adminIndex].role,
      createdAt: admins[adminIndex].createdAt,
      lastLogin: admins[adminIndex].lastLogin
    }
  });
});

app.put('/api/admin/users/:id/password', (req, res) => {
  const adminId = parseInt(req.params.id);
  const { currentPassword, newPassword } = req.body;
  
  const adminIndex = admins.findIndex(a => a.id === adminId);
  if (adminIndex === -1) {
    return res.status(404).json({ success: false, message: 'Admin not found' });
  }
  
  // Verify current password
  if (admins[adminIndex].password !== currentPassword) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }
  
  // Update password
  admins[adminIndex].password = newPassword; // In production, this should be hashed
  
  res.json({ success: true, message: 'Password updated successfully' });
});

app.delete('/api/admin/users/:id', (req, res) => {
  const adminId = parseInt(req.params.id);
  
  const adminIndex = admins.findIndex(a => a.id === adminId);
  if (adminIndex === -1) {
    return res.status(404).json({ success: false, message: 'Admin not found' });
  }
  
  // Prevent deleting the last admin
  if (admins.length === 1) {
    return res.status(400).json({ success: false, message: 'Cannot delete the last admin' });
  }
  
  admins.splice(adminIndex, 1);
  res.json({ success: true, message: 'Admin deleted successfully' });
});

// Appointments endpoints
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.get('/api/appointments/:id', (req, res) => {
  const appointment = appointments.find(a => a.id === parseInt(req.params.id));
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

app.post('/api/appointments', (req, res) => {
  const newAppointment = {
    id: Date.now(),
    ...req.body,
    status: 'pending'
  };
  appointments.push(newAppointment);
  res.json(newAppointment);
});

app.put('/api/appointments/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...req.body };
    res.json(appointments[index]);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    appointments.splice(index, 1);
    res.json({ message: 'Appointment deleted successfully' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

app.patch('/api/appointments/:id/status', (req, res) => {
  const appointment = appointments.find(a => a.id === parseInt(req.params.id));
  if (appointment) {
    appointment.status = req.body.status;
    res.json(appointment);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

// Services endpoints
app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

app.post('/api/services', (req, res) => {
  const newService = {
    id: Date.now(),
    ...req.body,
    status: 'active'
  };
  services.push(newService);
  res.json(newService);
});

app.put('/api/services/:id', (req, res) => {
  const index = services.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    services[index] = { ...services[index], ...req.body };
    res.json(services[index]);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

app.delete('/api/services/:id', (req, res) => {
  const index = services.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    services.splice(index, 1);
    res.json({ message: 'Service deleted successfully' });
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

// Stylists endpoints
app.get('/api/stylists', (req, res) => {
  res.json(stylists);
});

app.get('/api/stylists/:id', (req, res) => {
  const stylist = stylists.find(s => s.id === parseInt(req.params.id));
  if (stylist) {
    res.json(stylist);
  } else {
    res.status(404).json({ message: 'Stylist not found' });
  }
});

app.post('/api/stylists', (req, res) => {
  const newStylist = {
    id: Date.now(),
    ...req.body,
    status: 'active'
  };
  stylists.push(newStylist);
  res.json(newStylist);
});

app.put('/api/stylists/:id', (req, res) => {
  const index = stylists.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    stylists[index] = { ...stylists[index], ...req.body };
    res.json(stylists[index]);
  } else {
    res.status(404).json({ message: 'Stylist not found' });
  }
});

app.delete('/api/stylists/:id', (req, res) => {
  const index = stylists.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    stylists.splice(index, 1);
    res.json({ message: 'Stylist deleted successfully' });
  } else {
    res.status(404).json({ message: 'Stylist not found' });
  }
});

// Clients endpoints
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

app.get('/api/clients/:id', (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

app.post('/api/clients', (req, res) => {
  const newClient = {
    id: Date.now(),
    ...req.body,
    joinDate: new Date().toISOString().split('T')[0],
    totalSpent: 0,
    appointmentsCount: 0
  };
  clients.push(newClient);
  res.json(newClient);
});

app.put('/api/clients/:id', (req, res) => {
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients[index] = { ...clients[index], ...req.body };
    res.json(clients[index]);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

app.delete('/api/clients/:id', (req, res) => {
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients.splice(index, 1);
    res.json({ message: 'Client deleted successfully' });
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Analytics endpoints
app.get('/api/analytics/dashboard', (req, res) => {
  const totalAppointments = appointments.length;
  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.price, 0);
  const activeClients = clients.length;
  const totalServices = services.length;

  res.json({
    stats: [
      { title: 'Total Appointments', value: totalAppointments.toString(), change: '+12%', icon: 'Calendar' },
      { title: 'Revenue This Month', value: `$${totalRevenue.toLocaleString()}`, change: '+8%', icon: 'DollarSign' },
      { title: 'Active Clients', value: activeClients.toString(), change: '+5%', icon: 'Users' },
      { title: 'Services Offered', value: totalServices.toString(), change: '+2', icon: 'Scissors' }
    ],
    recentAppointments: appointments.slice(0, 4)
  });
});

app.get('/api/analytics/revenue', (req, res) => {
  const period = req.query.period || 'month';
  res.json({
    thisMonth: 24500,
    lastMonth: 22800,
    growth: '+7.5%'
  });
});

app.get('/api/analytics/popular-services', (req, res) => {
  res.json([
    { name: 'Hair Cut & Style', bookings: 45 },
    { name: 'Color Treatment', bookings: 32 },
    { name: 'Facial Treatment', bookings: 28 }
  ]);
});

// Settings endpoints
app.get('/api/settings', (req, res) => {
  res.json(settings);
});

app.put('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

// Products endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description || '',
    image: req.body.image || (Array.isArray(req.body.images) ? req.body.images[0] : undefined),
    images: Array.isArray(req.body.images) ? req.body.images : [],
    price: req.body.price,
    originalPrice: req.body.originalPrice || req.body.price,
    category: req.body.category || 'uncategorized',
    size: req.body.size || '',
    inStock: req.body.inStock !== false,
    featured: !!req.body.featured,
    bestSeller: !!req.body.bestSeller,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  res.json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    const updates = { ...req.body };
    if (Array.isArray(req.body.images)) {
      // Merge images to avoid dropping existing unless explicitly replaced
      const merged = Array.from(new Set([...(products[index].images || []), ...req.body.images]));
      updates.images = merged;
      updates.image = req.body.image || merged[0] || products[index].image;
    }
    products[index] = { ...products[index], ...updates };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Enhanced Payment endpoints
app.post('/api/payments/process', async (req, res) => {
  try {
    const paymentData = req.body;
    
    // Validate required fields
    if (!paymentData.amount || !paymentData.method || !paymentData.bookingData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }
    
    let paymentResult;
    
    // Process payment based on method
    switch (paymentData.method) {
      case 'card':
        if (!paymentData.cardData) {
          return res.status(400).json({
            success: false,
            error: 'Card data is required for card payments'
          });
        }
        paymentResult = await processCardPayment(paymentData);
        break;
        
      case 'paypal':
        paymentResult = await processPayPalPayment(paymentData);
        break;
        
      case 'apple-pay':
        paymentResult = await processApplePayPayment(paymentData);
        break;
        
      case 'gift-card':
        if (!paymentData.giftCardCode) {
          return res.status(400).json({
            success: false,
            error: 'Gift card code is required for gift card payments'
          });
        }
        paymentResult = await processGiftCardPayment(paymentData);
        break;
        
      default:
        return res.status(400).json({
          success: false,
          error: 'Unsupported payment method'
        });
    }
    
    // Create payment record
    const payment = {
      id: payments.length + 1,
      transactionId: paymentResult.transactionId,
      amount: paymentData.amount,
      currency: 'USD',
      method: paymentData.method,
      status: paymentResult.status,
      date: new Date().toISOString(),
      clientId: paymentData.bookingData.formData?.clientId || 1,
      appointmentId: paymentData.bookingData.appointmentId || null,
      service: paymentData.bookingData.selectedServices?.[0]?.name || 'Service',
      ...paymentResult
    };
    
    payments.push(payment);
    
    // Update appointment status if appointmentId is provided
    if (paymentData.bookingData.appointmentId) {
      const appointmentIndex = appointments.findIndex(a => a.id === paymentData.bookingData.appointmentId);
      if (appointmentIndex !== -1) {
        appointments[appointmentIndex].status = 'confirmed';
        appointments[appointmentIndex].paymentId = payment.id;
      }
    }
    
    res.json({
      success: true,
      transactionId: paymentResult.transactionId,
      amount: paymentData.amount,
      status: paymentResult.status,
      paymentId: payment.id,
      ...paymentResult
    });
    
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed'
    });
  }
});

app.get('/api/payments/history', (req, res) => {
  const { clientId, limit = 10, offset = 0 } = req.query;
  
  let filteredPayments = payments;
  
  // Filter by client if provided
  if (clientId) {
    filteredPayments = payments.filter(p => p.clientId === parseInt(clientId));
  }
  
  // Sort by date (newest first)
  filteredPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Apply pagination
  const paginatedPayments = filteredPayments.slice(offset, offset + parseInt(limit));
  
  res.json({
    payments: paginatedPayments,
    total: filteredPayments.length,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
});

app.get('/api/payments/:id', (req, res) => {
  const payment = payments.find(p => p.id === parseInt(req.params.id));
  
  if (!payment) {
    return res.status(404).json({
      success: false,
      error: 'Payment not found'
    });
  }
  
  res.json(payment);
});

app.post('/api/payments/refund', async (req, res) => {
  try {
    const { paymentId, reason, amount } = req.body;
    
    const payment = payments.find(p => p.id === parseInt(paymentId));
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    if (payment.status !== 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Payment cannot be refunded'
      });
    }
    
    const refundAmount = amount || payment.amount;
    
    // Simulate refund processing
    const refundResult = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          refundId: `REF_${Date.now()}`,
          amount: refundAmount,
          status: 'completed'
        });
      }, 1000);
    });
    
    // Update payment status
    payment.status = 'refunded';
    payment.refundId = refundResult.refundId;
    payment.refundAmount = refundAmount;
    payment.refundReason = reason;
    payment.refundDate = new Date().toISOString();
    
    res.json({
      success: true,
      refundId: refundResult.refundId,
      amount: refundAmount,
      status: 'completed'
    });
    
  } catch (error) {
    console.error('Refund processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Refund processing failed'
    });
  }
});

app.post('/api/payments/validate-gift-card', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'Gift card code is required'
    });
  }
  
  const validation = validateGiftCard(code);
  
  if (validation.valid) {
    res.json({
      success: true,
      giftCard: {
        code: validation.giftCard.code,
        remainingAmount: validation.giftCard.remainingAmount,
        expiryDate: validation.giftCard.expiryDate
      }
    });
  } else {
    res.status(400).json({
      success: false,
      error: validation.error
    });
  }
});

app.get('/api/payments/analytics', (req, res) => {
  const { startDate, endDate } = req.query;
  
  let filteredPayments = payments;
  
  // Filter by date range if provided
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filteredPayments = payments.filter(p => {
      const paymentDate = new Date(p.date);
      return paymentDate >= start && paymentDate <= end;
    });
  }
  
  // Calculate analytics
  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = filteredPayments.length;
  const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  
  // Payment method breakdown
  const methodBreakdown = filteredPayments.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + 1;
    return acc;
  }, {});
  
  // Status breakdown
  const statusBreakdown = filteredPayments.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
  
  res.json({
    totalRevenue,
    totalTransactions,
    averageTransaction,
    methodBreakdown,
    statusBreakdown,
    payments: filteredPayments
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- Authentication: /api/auth/*');
  console.log('- Appointments: /api/appointments/*');
  console.log('- Services: /api/services/*');
  console.log('- Stylists: /api/stylists/*');
  console.log('- Clients: /api/clients/*');
  console.log('- Analytics: /api/analytics/*');
  console.log('- Settings: /api/settings/*');
  console.log('- Products: /api/products/*');
  console.log('- Payments: /api/payments/*');
});

