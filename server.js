const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
// Increase body size limit to allow base64 images for multi-photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
  // Replace with your actual WhatsApp Business API credentials
  ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || 'your_whatsapp_access_token',
  PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || 'your_phone_number_id',
  API_VERSION: 'v17.0',
  
  // Branch-specific WhatsApp numbers
  BRANCH_NUMBERS: {
    powai: '+917400068615', // Powai branch WhatsApp number
    thane: '+919967002481'  // Thane branch WhatsApp number
  }
};

// WhatsApp API helper functions
const sendWhatsAppMessage = async (to, message, branch = 'powai') => {
  try {
    const phoneNumberId = WHATSAPP_CONFIG.PHONE_NUMBER_ID;
    const accessToken = WHATSAPP_CONFIG.ACCESS_TOKEN;
    
    // Format phone number (remove + and ensure it starts with country code)
    const formattedNumber = to.replace(/\D/g, '');
    const recipientNumber = formattedNumber.startsWith('91') ? formattedNumber : `91${formattedNumber}`;
    
    const url = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${phoneNumberId}/messages`;
    
    const payload = {
      messaging_product: 'whatsapp',
      to: recipientNumber,
      type: 'text',
      text: {
        body: message
      }
    };
    
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`WhatsApp message sent successfully to ${to} for ${branch} branch:`, response.data);
    return { success: true, messageId: response.data.messages[0].id };
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

const sendBranchNotification = async (appointmentData) => {
  const { branch, fullName, mobileNumber, selectedDate, selectedTime, bookingType, confirmationMethod } = appointmentData;
  
  // Get the appropriate WhatsApp number for the branch
  const branchNumber = WHATSAPP_CONFIG.BRANCH_NUMBERS[branch];
  
  if (!branchNumber) {
    console.error(`No WhatsApp number configured for branch: ${branch}`);
    return { success: false, error: 'Branch not configured' };
  }
  
  // Format the date
  const appointmentDate = new Date(selectedDate).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Create the message
  const confirmationMethodText = confirmationMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call';
  const message = `🎉 *New Booking Alert - ${branch.toUpperCase()} Branch*

👤 *Client Details:*
• Name: ${fullName}
• Phone: ${mobileNumber}
• Booking Type: ${bookingType}
• Confirmation Method: ${confirmationMethodText}

📅 *Appointment Details:*
• Date: ${appointmentDate}
• Time: ${selectedTime}
• Branch: ${branch === 'powai' ? 'Powai (Galleria)' : 'Thane (Anand Nagar)'}

📱 *Contact Client:* ${mobileNumber}
${confirmationMethod === 'whatsapp' ? '💬 *Client prefers WhatsApp confirmation*' : '📞 *Client prefers phone call confirmation*'}

Please confirm this appointment with the client using their preferred method.

---
La Coiffure Salon - ${branch.toUpperCase()} Branch`;

  // Send WhatsApp message to the branch
  const result = await sendWhatsAppMessage(branchNumber, message, branch);
  
  // Also send confirmation to client (optional)
  const clientMessage = `Thank you for booking with La Coiffure Salon!

Your appointment is confirmed:
📅 Date: ${appointmentDate}
⏰ Time: ${selectedTime}
📍 Branch: ${branch === 'powai' ? 'Powai (Galleria)' : 'Thane (Anand Nagar)'}

${confirmationMethod === 'whatsapp' 
  ? '💬 We\'ll send you a WhatsApp confirmation shortly.' 
  : '📞 We\'ll call you soon to confirm the details.'}

La Coiffure Salon Team`;

  // Send confirmation to client
  await sendWhatsAppMessage(mobileNumber, clientMessage, branch);
  
  return result;
};

// Data storage - Start with empty arrays
let appointments = [];

// Admin users storage - Start with default admin users
let admins = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@lacoiffure.com',
    password: 'admin123',
    role: 'super_admin',
    branches: ['powai', 'thane'],
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: null
  },
  {
    id: 2,
    username: 'lacoiffure',
    email: 'lacoiffure@lacoiffure.com',
    password: 'orhan110',
    role: 'admin',
    branches: ['powai', 'thane'],
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: null
  },
  {
    id: 3,
    username: 'hannan',
    email: 'hannan@lacoiffure.com',
    password: 'a.hannan123',
    role: 'super_admin',
    branches: ['powai', 'thane'],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

let services = [];

let stylists = [];

let clients = [];

let blogPosts = [];

let products = [];

let settings = {
  salonName: '',
  phone: '',
  email: '',
  address: '',
  openingTime: '09:00',
  closingTime: '20:00'
};

// Payment data storage
let payments = [];

let giftCards = [];

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

// Mock user data - in a real app, this would come from a database
let users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    password: 'password123',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, username, password } = req.body;
  
  // Find user by email OR username
  const user = users.find(u => 
    (u.email === email || u.email === username) || 
    (u.username === email || u.username === username)
  );
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Email or username not found. Please check your credentials.' 
    });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Incorrect password. Please check your password.' 
    });
  }
  
  res.json({
    success: true,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/register', (req, res) => {
  const userData = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => 
    u.email === userData.email || u.username === userData.username
  );
  
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email or username already exists'
    });
  }
  
  // Create new user
  const newUser = {
    id: Date.now(),
    ...userData,
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  // Add to users array
  users.push(newUser);
  
  res.json({
    success: true,
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/admin-login', (req, res) => {
  const { username, password, email } = req.body;
  
  // Find admin by username OR email (supports passing email in the username field)
  const admin = admins.find(a => a.username === username || a.email === username || a.email === email);
  
  if (!admin) {
    return res.status(401).json({ 
      success: false, 
      message: 'Username or email not found. Please check your credentials.' 
    });
  }
  
  if (admin.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Incorrect password. Please check your password.' 
    });
  }
  
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
    branches: admin.branches || [],
    isActive: admin.isActive !== false,
    createdAt: admin.createdAt,
    lastLogin: admin.lastLogin
  }));
  res.json(adminUsers);
});

app.post('/api/admin/users', (req, res) => {
  try {
    const { username, password, email, role = 'admin', branches = [] } = req.body;
    
    // Validate required fields
    if (!username || !password || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, password, and email are required' 
      });
    }
    
    // Check if username already exists
    if (admins.find(a => a.username === username)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }
    
    // Check if email already exists
    if (admins.find(a => a.email === email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }
    
    const newAdmin = {
      id: Date.now(),
      username,
      password, // In production, this should be hashed
      email,
      role,
      branches,
      isActive: true,
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
        branches: newAdmin.branches,
        isActive: newAdmin.isActive,
        createdAt: newAdmin.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
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
  const { branch } = req.query;
  
  let filteredAppointments = appointments;
  
  // Filter by branch if specified
  if (branch) {
    filteredAppointments = appointments.filter(appointment => 
      appointment.branch === branch
    );
  }
  
  res.json({
    appointments: filteredAppointments,
    total: filteredAppointments.length,
    branch: branch || 'all'
  });
});

app.get('/api/appointments/:id', (req, res) => {
  const appointment = appointments.find(a => a.id === parseInt(req.params.id));
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const newAppointment = {
      id: Date.now(),
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Add the appointment to the array
    appointments.push(newAppointment);
    
    // Send WhatsApp notification to the appropriate branch
    if (newAppointment.branch && newAppointment.mobileNumber) {
      console.log(`Sending WhatsApp notification for ${newAppointment.branch} branch with ${newAppointment.confirmationMethod || 'whatsapp'} confirmation...`);
      const whatsappResult = await sendBranchNotification(newAppointment);
      
      if (whatsappResult.success) {
        console.log('WhatsApp notification sent successfully');
        // Update appointment with notification status
        newAppointment.whatsappSent = true;
        newAppointment.whatsappMessageId = whatsappResult.messageId;
      } else {
        console.error('Failed to send WhatsApp notification:', whatsappResult.error);
        newAppointment.whatsappSent = false;
        newAppointment.whatsappError = whatsappResult.error;
      }
    }
    
    res.json({
      success: true,
      appointment: newAppointment,
      whatsappSent: newAppointment.whatsappSent || false
    });
    
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create appointment',
      details: error.message
    });
  }
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
  const { branch } = req.query;
  
  let filteredStylists = stylists;
  
  // Filter by branch if specified
  if (branch) {
    filteredStylists = stylists.filter(stylist => stylist.branch === branch);
  }
  
  res.json({
    stylists: filteredStylists,
    total: filteredStylists.length,
    branch: branch || 'all'
  });
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
  const { branch } = req.query;
  
  let filteredAppointments = appointments;
  if (branch) {
    filteredAppointments = appointments.filter(apt => apt.branch === branch);
  }
  
  const totalAppointments = filteredAppointments.length;
  const totalRevenue = filteredAppointments.reduce((sum, apt) => sum + apt.price, 0);
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

// WhatsApp test endpoint
app.post('/api/whatsapp/test', async (req, res) => {
  try {
    const { phoneNumber, branch = 'powai', message } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }
    
    const testMessage = message || `Test message from La Coiffure Salon - ${branch.toUpperCase()} Branch`;
    const result = await sendWhatsAppMessage(phoneNumber, testMessage, branch);
    
    res.json({
      success: result.success,
      message: result.success ? 'Test message sent successfully' : 'Failed to send test message',
      details: result
    });
    
  } catch (error) {
    console.error('Error sending test WhatsApp message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test message',
      details: error.message
    });
  }
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

