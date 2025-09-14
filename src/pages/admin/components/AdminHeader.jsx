import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminHeader = ({ activeTab, setActiveTab, adminRole, onLogout }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Layout' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'services', label: 'Services', icon: 'Scissors' },
    { id: 'products', label: 'Products', icon: 'Package' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'stylists', label: 'Stylists', icon: 'Users' },
    { id: 'clients', label: 'Clients', icon: 'User' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
    { id: 'profile', label: 'Profile', icon: 'UserCircle' },
    ...(adminRole === 'super_admin' ? [
      { id: 'settings', label: 'Settings', icon: 'Settings' },
      { id: 'admin', label: 'Admin', icon: 'Shield' }
    ] : [])
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">La Coiffure Salon</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Icon name={showMobileMenu ? "X" : "Menu"} size={16} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="mt-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-luxury ${
                  activeTab === tab.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
            
            <div className="pt-2 border-t border-border mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-error border-error hover:bg-error hover:text-error-foreground"
                onClick={onLogout}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden lg:block bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              {tabs.find(tab => tab.id === activeTab)?.label || 'Admin Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {tabs.find(tab => tab.id === activeTab)?.description || 'Manage your salon operations'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden xl:flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-xs text-muted-foreground">Today's Appointments</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">$2,450</p>
                <p className="text-xs text-muted-foreground">Today's Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">12</p>
                <p className="text-xs text-muted-foreground">Pending Tasks</p>
              </div>
            </div>

            {/* Admin User Info */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-medium text-sm">
                  A
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground capitalize">{adminRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
