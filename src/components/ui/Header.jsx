import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  // Mock authentication state - in real app this would come from context/state management
  const isAuthenticated = false; // Set to true to see authenticated state
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
  };

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Services', path: '/services-catalog', icon: 'Scissors' },
    { label: 'Gallery', path: '/gallery-portfolio', icon: 'Image' },
    { label: 'Our Team', path: '/stylist-profiles', icon: 'Users' },
    { label: 'Our Products', path: '/products', icon: 'Package' },
    { label: 'Contact', path: '/contact-location', icon: 'MapPin' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-luxury ${
          isScrolled ? 'shadow-luxury' : ''
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/homepage" 
              className="flex items-center space-x-3 transition-luxury hover:opacity-80"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Scissors" size={20} color="white" className="lg:w-6 lg:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg lg:text-xl text-primary">
                  La Coiffure
                </span>
                <span className="font-caption text-xs text-muted-foreground -mt-1">
                  Luxury Salon
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-luxury hover:text-accent ${
                    isActivePath(item?.path) 
                      ? 'text-accent' :'text-foreground'
                  }`}
                >
                  {item?.label}
                  {isActivePath(item?.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                // Authenticated User Menu
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-luxury"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-luxury py-2">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-luxury"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon name="Home" size={16} />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/appointment-booking"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-luxury"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon name="Calendar" size={16} />
                          <span>Book Appointment</span>
                        </Link>
                        <Link
                          to="/blog"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-luxury"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon name="FileText" size={16} />
                          <span>Blog</span>
                        </Link>
                        <Link
                          to="/login"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-luxury"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon name="Settings" size={16} />
                          <span>Admin Login</span>
                        </Link>
                        <div className="border-t border-border my-2"></div>
                        <button className="flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-muted transition-luxury w-full">
                          <Icon name="LogOut" size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                              ) : (
                  // Guest Actions
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
              
              <Link to="/appointment-booking">
                <Button size="sm">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 rounded-lg hover:bg-muted transition-luxury touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-border py-4 mobile-menu-container">
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-lg transition-luxury touch-manipulation ${
                      isActivePath(item?.path)
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="border-t border-border mt-4 pt-4 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-luxury"
                      onClick={closeMobileMenu}
                    >
                      <Icon name="Home" size={20} />
                      <span>Dashboard</span>
                    </Link>
                    <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-destructive hover:bg-muted transition-luxury w-full">
                      <Icon name="LogOut" size={20} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-4 py-4 rounded-lg text-foreground hover:bg-muted transition-luxury touch-manipulation"
                    onClick={closeMobileMenu}
                  >
                    <Icon name="LogIn" size={20} />
                                          <span>Login</span>
                  </Link>
                )}
                
                <Link
                  to="/appointment-booking"
                  className="flex items-center space-x-3 px-4 py-4 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-luxury touch-manipulation"
                  onClick={closeMobileMenu}
                >
                  <Icon name="Calendar" size={20} />
                  <span>Book Appointment</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;