import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { GalleryProvider } from "./contexts/GalleryContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { UserProvider } from "./contexts/UserContext";
import NotFound from "pages/NotFound";
import AboutUs from './pages/about-us';
import GalleryPortfolio from './pages/gallery-portfolio';
import AppointmentBooking from './pages/appointment-booking';
import ContactLocationPage from './pages/contact-location';
import ServicesCatalog from './pages/services-catalog';
// import StylistProfiles from './pages/stylist-profiles';
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/products';
import ProductDetail from './pages/products/ProductDetail';
import Payment from './pages/payment/Payment';
import PaymentConfirmation from './pages/payment/PaymentConfirmation';
import CartPage from './pages/payment/CartPage';
import Admin from './pages/admin/Admin';


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <GalleryProvider>
          <ServiceProvider>
            <CategoryProvider>
              <UserProvider>
                <ScrollToTop />
            <RouterRoutes>
        {/* Main Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/services-catalog" element={<ServicesCatalog />} />
        {/** Team page removed */}
        <Route path="/gallery-portfolio" element={<GalleryPortfolio />} />
        <Route path="/contact-location" element={<ContactLocationPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        
        {/* Payment */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
            </RouterRoutes>
              </UserProvider>
            </CategoryProvider>
          </ServiceProvider>
        </GalleryProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
