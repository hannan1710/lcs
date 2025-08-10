import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import FeaturedServices from './components/FeaturedServices';
import StylistSpotlight from './components/StylistSpotlight';
import ClientTestimonials from './components/ClientTestimonials';
import SalonGallery from './components/SalonGallery';
import ContactCTA from './components/ContactCTA';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedServices />
        <StylistSpotlight />
        <ClientTestimonials />
        <SalonGallery />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;