import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    loyaltyPoints: 1250,
    memberSince: '2023-03-15',
    hairType: 'Curly',
    allergies: 'None'
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-muted-foreground">
              Manage your appointments, track your loyalty points, and explore our services.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  <p className="text-2xl font-bold text-foreground">{user.loyaltyPoints}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Star" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings.filter(b => b.status === 'upcoming').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${bookings.reduce((sum, b) => sum + b.price, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-8">
            {[
              { id: 'overview', label: 'Overview', icon: 'Home' },
              { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
              { id: 'rewards', label: 'Rewards', icon: 'Gift' },
              { id: 'profile', label: 'Profile', icon: 'User' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/appointment-booking">
                      <Button className="w-full justify-start">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Book New Appointment
                      </Button>
                    </Link>
                    <Link to="/services-catalog">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Scissors" size={16} className="mr-2" />
                        Browse Services
                      </Button>
                    </Link>
                    <Link to="/stylist-profiles">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Users" size={16} className="mr-2" />
                        View Our Team
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map(booking => (
                      <div key={booking.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Icon name={getStatusIcon(booking.status)} size={16} className={getStatusColor(booking.status)} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{booking.service}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)} bg-muted`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Booking History</h3>
                  <Link to="/appointment-booking">
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      New Booking
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{booking.service}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Stylist: {booking.stylist}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">${booking.price}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)} bg-muted`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Loyalty Rewards</h3>
                  <div className="text-sm text-muted-foreground">
                    {user.loyaltyPoints} points available
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewards.map(reward => (
                    <div key={reward.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{reward.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                          <p className="text-sm text-accent mt-2">{reward.points} points</p>
                        </div>
                        <Button
                          size="sm"
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
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <p className="text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <p className="text-muted-foreground">{user.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Hair Type</label>
                    <p className="text-muted-foreground">{user.hairType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Allergies</label>
                    <p className="text-muted-foreground">{user.allergies}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Member Since</label>
                    <p className="text-muted-foreground">
                      {new Date(user.memberSince).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Edit Profile
                  </Button>
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

