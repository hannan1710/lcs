import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useUser } from '../../contexts/UserContext';
import Image from '../../components/AppImage';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();
  const { user, logout: userLogout, isLoading } = useUser();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    navigate('/homepage');
    return null;
  }

  // Mock booking history
  const bookings = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM',
      service: 'Signature Cut & Style',
      stylist: 'Isabella Martinez',
      status: 'completed',
      price: 150
    },
    {
      id: 2,
      date: '2024-01-22',
      time: '2:30 PM',
      service: 'Color Transformation',
      stylist: 'Michael Chen',
      status: 'upcoming',
      price: 280
    },
    {
      id: 3,
      date: '2024-01-08',
      time: '11:00 AM',
      service: 'Deep Conditioning',
      stylist: 'Emma Rodriguez',
      status: 'completed',
      price: 80
    }
  ];

  // Mock loyalty rewards
  const rewards = [
    {
      id: 1,
      name: 'Free Deep Conditioning',
      points: 500,
      description: 'Complimentary deep conditioning treatment',
      available: true
    },
    {
      id: 2,
      name: '20% Off Color Service',
      points: 1000,
      description: '20% discount on any color service',
      available: true
    },
    {
      id: 3,
      name: 'Free Styling Session',
      points: 750,
      description: 'Free styling session with any stylist',
      available: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'upcoming':
        return 'text-accent';
      case 'cancelled':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'upcoming':
        return 'Calendar';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/homepage");
  };

  const totalSpent = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your appointments, track your loyalty points, and explore our services.
                  </p>
                </div>
              </div>
              {/* Sign Out Button positioned on the right */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-luxury bg-background border border-destructive/20 shadow-luxury hover:border-destructive"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-6 hover:shadow-luxury transition-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Loyalty Points</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{user.loyaltyPoints}</p>
                  <p className="text-xs text-accent mt-1">Keep earning rewards!</p>
                </div>
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name="Star" size={28} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 hover:shadow-luxury transition-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Upcoming Appointments</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    {bookings.filter(b => b.status === 'upcoming').length}
                  </p>
                  <p className="text-xs text-primary mt-1">Next appointment soon</p>
                </div>
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={28} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-xl p-6 hover:shadow-luxury transition-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    ${user.totalSpent || totalSpent}
                  </p>
                  <p className="text-xs text-success mt-1">Loyal customer</p>
                </div>
                <div className="w-14 h-14 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="DollarSign" size={28} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted/50 rounded-xl p-1 mb-8 border border-border">
            {[
              { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
              { id: 'rewards', label: 'Rewards', icon: 'Gift' },
              { id: 'profile', label: 'Profile', icon: 'User' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-luxury ${
                  activeTab === tab.id
                    ? 'bg-card text-foreground shadow-luxury border border-border'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'bookings' && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-luxury">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Booking History</h3>
                  <Link to="/appointment-booking">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Icon name="Plus" size={16} className="mr-2" />
                      New Booking
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="border border-border rounded-xl p-5 hover:shadow-luxury transition-luxury bg-gradient-to-r from-background to-muted/20">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-foreground text-lg">{booking.service}</h4>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(booking.status)} bg-muted/50`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>{new Date(booking.date).toLocaleDateString()} at {booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="User" size={14} />
                              <span>{booking.stylist}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={14} />
                              <span>${booking.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Icon name={getStatusIcon(booking.status)} size={20} className={getStatusColor(booking.status)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-luxury">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Loyalty Rewards</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Star" size={16} className="text-accent" />
                    <span className="font-medium">{user.loyaltyPoints} points available</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rewards.map(reward => (
                    <div key={reward.id} className="border border-border rounded-xl p-5 hover:shadow-luxury transition-luxury bg-gradient-to-br from-background to-muted/20">
                      <div className="flex flex-col sm:flex-row items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="Gift" size={20} className="text-accent" />
                            <h4 className="font-semibold text-foreground text-lg">{reward.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-accent">{reward.points} points</span>
                            {!reward.available && (
                              <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded-full">
                                Unavailable
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className={`mt-4 sm:mt-0 ${
                            reward.available && user.loyaltyPoints >= reward.points
                              ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                              : 'opacity-50 cursor-not-allowed'
                          }`}
                          disabled={!reward.available || user.loyaltyPoints < reward.points}
                        >
                          {reward.available && user.loyaltyPoints >= reward.points ? 'Redeem' : 'Unavailable'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-luxury">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-semibold text-foreground">Profile Information</h3>
                  <Button variant="outline" className="border-accent/20 text-accent hover:bg-accent/10">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                {/* Profile Header */}
                <div className="flex items-center space-x-6 mb-8 p-6 bg-gradient-to-r from-muted/20 to-background rounded-xl border border-border">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground">{user.name}</h4>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>Member since {new Date(user.memberSince).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-accent" />
                        <span>{user.loyaltyPoints} points</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg border border-border">
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <p className="text-foreground font-medium">{user.name}</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg border border-border">
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <p className="text-foreground font-medium">{user.email}</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg border border-border">
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <p className="text-foreground font-medium">{user.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg border border-border">
                      <label className="block text-sm font-medium text-foreground mb-2">Hair Type</label>
                      <p className="text-foreground font-medium">{user.hairType}</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg border border-border">
                      <label className="block text-sm font-medium text-foreground mb-2">Allergies</label>
                      <p className="text-foreground font-medium">{user.allergies}</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg border border-border">
                      <label className="block text-sm font-medium text-foreground mb-2">Member Since</label>
                      <p className="text-foreground font-medium">
                        {new Date(user.memberSince).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;