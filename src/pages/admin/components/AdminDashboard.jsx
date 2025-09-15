import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminDashboard = ({ stats, recentAppointments, services, stylists }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'cancelled': return 'text-error';
      case 'active': return 'text-success';
      case 'inactive': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'cancelled': return 'XCircle';
      case 'active': return 'CheckCircle';
      case 'inactive': return 'PauseCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
            <Icon name="TrendingUp" size={24} className="text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Welcome back!</h2>
            <p className="text-muted-foreground">Here's what's happening at your salon today.</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-luxury transition-luxury">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Icon name={stat.icon} size={24} className="text-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Appointments</h3>
            <button className="text-sm text-accent hover:text-accent/80 transition-luxury">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {(Array.isArray(recentAppointments) ? recentAppointments : [])?.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-luxury">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{appointment.client}</p>
                  <p className="text-sm text-muted-foreground truncate">{appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.date}</p>
                  <p className="text-xs text-muted-foreground">{appointment.time}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name={getStatusIcon(appointment.status)} size={12} className={getStatusColor(appointment.status)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-luxury group">
              <Icon name="Plus" size={20} className="text-accent mb-2" />
              <p className="text-sm font-medium text-foreground">Add Appointment</p>
            </button>
            
            <button className="p-4 bg-success/10 hover:bg-success/20 rounded-lg transition-luxury group">
              <Icon name="Scissors" size={20} className="text-success mb-2" />
              <p className="text-sm font-medium text-foreground">Add Service</p>
            </button>
            
            <button className="p-4 bg-warning/10 hover:bg-warning/20 rounded-lg transition-luxury group">
              <Icon name="Users" size={20} className="text-warning mb-2" />
              <p className="text-sm font-medium text-foreground">Add Stylist</p>
            </button>
            
            <button className="p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-luxury group">
              <Icon name="Package" size={20} className="text-accent mb-2" />
              <p className="text-sm font-medium text-foreground">Add Product</p>
            </button>
          </div>
        </div>
      </div>

      {/* Services & Stylists Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Services */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Popular Services</h3>
          
          <div className="space-y-4">
            {(Array.isArray(services) ? services : [])?.slice(0, 4).map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Scissors" size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Stylists */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Active Stylists</h3>
          
          <div className="space-y-4">
            {(Array.isArray(stylists) ? stylists : [])?.slice(0, 4).map((stylist) => (
              <div key={stylist.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-medium text-sm">
                    {stylist.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{stylist.name}</p>
                  <p className="text-xs text-muted-foreground">{stylist.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{stylist.experience}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(stylist.status)}`}>
                    {stylist.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {[
            { action: 'New appointment booked', client: 'Sarah Johnson', time: '2 minutes ago', type: 'appointment' },
            { action: 'Payment received', client: 'Emily Davis', time: '15 minutes ago', type: 'payment' },
            { action: 'Service updated', client: 'Hair Cut & Style', time: '1 hour ago', type: 'service' },
            { action: 'New stylist added', client: 'James Wilson', time: '2 hours ago', type: 'stylist' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.type === 'appointment' ? 'bg-accent/10' :
                activity.type === 'payment' ? 'bg-success/10' :
                activity.type === 'service' ? 'bg-warning/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={
                    activity.type === 'appointment' ? 'Calendar' :
                    activity.type === 'payment' ? 'CreditCard' :
                    activity.type === 'service' ? 'Scissors' : 'Users'
                  } 
                  size={14} 
                  className={
                    activity.type === 'appointment' ? 'text-accent' :
                    activity.type === 'payment' ? 'text-success' :
                    activity.type === 'service' ? 'text-warning' : 'text-muted-foreground'
                  } 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.client}</p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
