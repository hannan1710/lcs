import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminSidebar = ({ activeTab, setActiveTab, adminRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Layout', description: 'Overview & Analytics' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar', description: 'Manage bookings' },
    { id: 'services', label: 'Services', icon: 'Scissors', description: 'Service catalog' },
    { id: 'products', label: 'Products', icon: 'Package', description: 'Product inventory' },
    { id: 'gallery', label: 'Gallery', icon: 'Image', description: 'Photo & video gallery' },
    { id: 'stylists', label: 'Stylists', icon: 'Users', description: 'Team management' },
    { id: 'clients', label: 'Clients', icon: 'User', description: 'Customer database' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard', description: 'Payment & refunds' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart', description: 'Reports & insights' },
    { id: 'categories', label: 'Categories', icon: 'Tags', description: 'Service categories' },
    { id: 'whatsapp', label: 'WhatsApp Test', icon: 'MessageCircle', description: 'Test notifications' },
    { id: 'profile', label: 'Profile', icon: 'UserCircle', description: 'Manage your profile' },
    ...(adminRole === 'super_admin' ? [
      { id: 'settings', label: 'Settings', icon: 'Settings', description: 'System configuration' },
      { id: 'admin', label: 'Admin Users', icon: 'Shield', description: 'User management' }
    ] : [])
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const handleGoToWebsite = () => {
    navigate('/homepage');
  };

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-foreground">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">La Coiffure Salon</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-luxury group ${
                activeTab === tab.id
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeTab === tab.id 
                  ? 'bg-accent-foreground/20' 
                  : 'bg-muted group-hover:bg-accent/10'
              }`}>
                <Icon 
                  name={tab.icon} 
                  size={18} 
                  className={activeTab === tab.id ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-accent'} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${
                  activeTab === tab.id ? 'text-accent-foreground' : 'text-foreground'
                }`}>
                  {tab.label}
                </p>
                <p className={`text-xs ${
                  activeTab === tab.id ? 'text-accent-foreground/70' : 'text-muted-foreground'
                }`}>
                  {tab.description}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleGoToWebsite}
        >
          <Icon name="ExternalLink" size={16} className="mr-2" />
          View Website
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-error border-error hover:bg-error hover:text-error-foreground"
          onClick={handleLogout}
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          Logout
        </Button>
      </div>

      {/* Admin Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground font-medium text-sm">
              A
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground capitalize">{adminRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
