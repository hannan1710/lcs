# La Coiffure Salon - Full Stack Application

A modern, responsive salon management system with both frontend and backend functionality, featuring a comprehensive payment processing system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   npm run server
   ```
   This starts the mock backend server on `http://localhost:3001`

3. **Start the Frontend Development Server**
   ```bash
   npm start
   ```
   This starts the React app on `http://localhost:5173`

4. **Run Both Together (Recommended)**
   ```bash
   npm run dev
   ```
   This runs both backend and frontend simultaneously.

## 🔧 Available Scripts

- `npm start` - Start the React development server
- `npm run server` - Start the backend API server
- `npm run dev` - Run both frontend and backend together
- `npm run build` - Build the production version
- `npm run serve` - Preview the production build

## 🌐 Application Features

### Frontend Features
- **Responsive Design** - Mobile-first approach with touch-friendly interfaces
- **User Authentication** - Login/Register with unified interface
- **Admin Dashboard** - Comprehensive management system
- **Appointment Booking** - Multi-step booking process
- **Payment Processing** - Secure payment gateway integration with multiple payment methods
- **Products Catalog** - Browse and purchase La Coiffure Salon brand products
- **Service Catalog** - Browse and book salon services
- **Stylist Profiles** - View stylist information and specialties

### Backend API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/admin-login` - Admin authentication

#### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `PATCH /api/appointments/:id/status` - Update appointment status

#### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

#### Stylists
- `GET /api/stylists` - Get all stylists
- `POST /api/stylists` - Create new stylist
- `PUT /api/stylists/:id` - Update stylist
- `DELETE /api/stylists/:id` - Delete stylist

#### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/revenue` - Get revenue data
- `GET /api/analytics/popular-services` - Get popular services

#### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Payments
- `POST /api/payments/process` - Process payment with multiple methods
- `GET /api/payments/history` - Get payment history with pagination
- `GET /api/payments/:id` - Get specific payment details
- `POST /api/payments/refund` - Process refunds
- `POST /api/payments/validate-gift-card` - Validate gift card codes
- `GET /api/payments/analytics` - Get payment analytics and reports

## 💳 Payment System Features

### Supported Payment Methods
1. **Credit/Debit Cards**
   - Visa, Mastercard, American Express, Discover
   - Real-time card validation (Luhn algorithm)
   - Secure card data processing
   - Automatic card brand detection

2. **PayPal**
   - Seamless PayPal integration
   - Redirect to PayPal for payment completion

3. **Apple Pay**
   - Quick and secure mobile payments
   - Native iOS integration

4. **Gift Cards**
   - Gift card code validation
   - Balance checking and application
   - Automatic discount calculation

### Payment Processing Features
- **Real-time Validation** - Card number, expiry, CVV validation
- **Security** - Industry-standard encryption and security practices
- **Error Handling** - Comprehensive error messages and user feedback
- **Transaction Tracking** - Unique transaction IDs and status tracking
- **Refund Processing** - Full and partial refund capabilities
- **Analytics** - Payment analytics and reporting
- **Integration** - Seamless integration with booking system

### Payment Flow
1. **Booking Confirmation** - User confirms appointment details
2. **Payment Method Selection** - Choose from available payment methods
3. **Payment Processing** - Secure payment processing with validation
4. **Confirmation** - Payment confirmation with transaction details
5. **Appointment Confirmation** - Automatic appointment status update

## 🔐 Authentication

### User Login
- **Email**: `user@example.com`
- **Password**: `password123`

### Admin Login
- **Username**: `admin`
- **Password**: `admin123`

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Touch-friendly buttons (44px minimum)
- Optimized card sizes for mobile
- Responsive typography
- Mobile-first navigation
- Improved touch targets

## 🎨 UI/UX Enhancements

- **Modern Design** - Clean, luxury-focused interface
- **Smooth Animations** - Framer Motion integration
- **Loading States** - Proper loading indicators
- **Error Handling** - User-friendly error messages
- **Form Validation** - Real-time validation feedback
- **Accessibility** - ARIA labels and keyboard navigation

## 🎯 Future Enhancements

- **Stripe Integration** - Real payment processing
- **PayPal SDK** - Direct PayPal integration
- **Apple Pay SDK** - Native Apple Pay support
- **Email Notifications** - Payment confirmations
- **SMS Notifications** - Payment status updates
- **Multi-currency Support** - International payments
- **Subscription Payments** - Recurring payment support
