import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { appointmentsAPI, servicesAPI, stylistsAPI, clientsAPI, analyticsAPI, settingsAPI } from '../../services/api';
import PaymentManagement from './components/PaymentManagement';
import AdminManagement from './components/AdminManagement';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({
    appointments: [],
    services: [],
    stylists: [],
    clients: [],
    stats: [],
    settings: {}
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Check admin authentication
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  // Load data from API
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [appointments, services, stylists, clients, analytics, settings] = await Promise.all([
        appointmentsAPI.getAll(),
        servicesAPI.getAll(),
        stylistsAPI.getAll(),
        clientsAPI.getAll(),
        analyticsAPI.getDashboardStats(),
        settingsAPI.get()
      ]);

      setData({
        appointments,
        services,
        stylists,
        clients,
        stats: analytics.stats,
        settings
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Handle CRUD operations
  const handleAdd = (type) => {
    setModalType('add');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    setModalType('edit');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        switch (type) {
          case 'appointment':
            await appointmentsAPI.delete(id);
            break;
          case 'service':
            await servicesAPI.delete(id);
            break;
          case 'stylist':
            await stylistsAPI.delete(id);
            break;
          case 'client':
            await clientsAPI.delete(id);
            break;
        }
        loadData(); // Reload data
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await appointmentsAPI.updateStatus(id, status);
      loadData(); // Reload data
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  // Use data from API instead of mock data
  const { stats, appointments: recentAppointments, services, stylists } = data;

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

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Layout' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'services', label: 'Services', icon: 'Scissors' },
    { id: 'stylists', label: 'Stylists', icon: 'Users' },
    { id: 'clients', label: 'Clients', icon: 'User' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'admin', label: 'Admin', icon: 'Users' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your salon operations, appointments, and services
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-error text-error hover:bg-error hover:text-error-foreground"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-luxury ${
                  activeTab === tab.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.title} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-success">{stat.change}</p>
                      </div>
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name={stat.icon} size={24} className="text-accent" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Appointments */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Appointments</h3>
                <div className="space-y-3">
                  {recentAppointments?.slice(0, 5).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <Icon name="Calendar" size={16} className="text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{appointment.client}</p>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{appointment.date}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <PaymentManagement />
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-semibold text-foreground">$24,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Month</span>
                      <span className="font-semibold text-foreground">$22,800</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="text-success">+7.5%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Popular Services</h3>
                  <div className="space-y-3">
                    {services?.slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{service.name}</span>
                        <span className="text-sm font-medium text-accent">${service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="bg-card border border-border rounded-lg p-6">
                             <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-semibold text-foreground">All Appointments</h3>
                 <Button size="sm" onClick={() => handleAdd('appointment')}>
                   <Icon name="Plus" size={16} className="mr-2" />
                   Add Appointment
                 </Button>
               </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stylist</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-border/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-foreground">{appointment.client}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{appointment.service}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">Emma Rodriguez</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                            <Icon name={getStatusIcon(appointment.status)} size={12} />
                            <span>{appointment.status}</span>
                          </span>
                        </td>
                                                 <td className="py-3 px-4">
                           <div className="flex items-center space-x-2">
                             <Button 
                               size="xs" 
                               variant="outline"
                               onClick={() => handleEdit(appointment, 'appointment')}
                             >
                               <Icon name="Edit" size={12} />
                             </Button>
                             <Button 
                               size="xs" 
                               variant="outline"
                               onClick={() => handleDelete(appointment.id, 'appointment')}
                             >
                               <Icon name="Trash" size={12} />
                             </Button>
                           </div>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="bg-card border border-border rounded-lg p-6">
                             <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-semibold text-foreground">Services Management</h3>
                 <Button size="sm" onClick={() => handleAdd('service')}>
                   <Icon name="Plus" size={16} className="mr-2" />
                   Add Service
                 </Button>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-foreground">{service.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Price: {service.price}</p>
                      <p>Duration: {service.duration}</p>
                      <p>Category: {service.category}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button size="xs" variant="outline">
                        <Icon name="Edit" size={12} />
                      </Button>
                      <Button size="xs" variant="outline">
                        <Icon name="Trash" size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stylists Tab */}
          {activeTab === 'stylists' && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Stylists Management</h3>
                <Button size="sm" onClick={() => handleAdd('stylist')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Stylist
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stylists.map((stylist) => (
                  <div key={stylist.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-foreground">{stylist.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(stylist.status)}`}>
                        {stylist.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Specialty: {stylist.specialty}</p>
                      <p>Experience: {stylist.experience}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button 
                        size="xs" 
                        variant="outline"
                        onClick={() => handleEdit(stylist, 'stylist')}
                      >
                        <Icon name="Edit" size={12} />
                      </Button>
                      <Button 
                        size="xs" 
                        variant="outline"
                        onClick={() => handleDelete(stylist.id, 'stylist')}
                      >
                        <Icon name="Trash" size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Salon Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">General Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Salon Name</label>
                      <input type="text" defaultValue="La Coiffure Luxury Salon" className="w-full mt-1 p-2 border border-border rounded-md bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                      <input type="tel" defaultValue="+91 99670 02481" className="w-full mt-1 p-2 border border-border rounded-md bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <input type="email" defaultValue="info@lacoiffure.com" className="w-full mt-1 p-2 border border-border rounded-md bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Address</label>
                      <input type="text" defaultValue="Shop no. 11&12, Saraswati school, Anand Nagar, Thane West, Thane, Maharashtra 400615" className="w-full mt-1 p-2 border border-border rounded-md bg-background" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Business Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Opening Time</label>
                      <input type="time" defaultValue="09:00" className="w-full mt-1 p-2 border border-border rounded-md bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Closing Time</label>
                      <input type="time" defaultValue="20:00" className="w-full mt-1 p-2 border border-border rounded-md bg-background" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => alert('Settings saved successfully!')}>
                    <Icon name="Save" size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Admin Management Tab */}
          {activeTab === 'admin' && (
            <AdminManagement />
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
