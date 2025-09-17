import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { appointmentsAPI, servicesAPI, stylistsAPI, clientsAPI, analyticsAPI, settingsAPI, productsAPI } from '../../services/api';
import PaymentManagement from './components/PaymentManagement';
import AdminManagement from './components/AdminManagement';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import AdminDashboard from './components/AdminDashboard';
import AdminProfile from './components/AdminProfile';
import ServiceManagement from './components/ServiceManagement';
import ProductManagement from './components/ProductManagement';
import AppointmentManagement from './components/AppointmentManagement';
import GalleryManagement from './components/GalleryManagement';
import HomepageGallerySelector from './components/HomepageGallerySelector';
import NotificationTest from './components/WhatsAppTest';
import CategoryManagement from './components/CategoryManagement';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useGallery } from '../../contexts/GalleryContext';
import { useService } from '../../contexts/ServiceContext';
import { useBranch } from '../../contexts/BranchContext';
import BranchSelector from './components/BranchSelector';
import AdminLogin from './components/AdminLogin';
import AdminUserManagement from './components/AdminUserManagement';
import ClientManagement from './components/ClientManagement';

const Admin = () => {
  const navigate = useNavigate();
  const { galleryData, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery();
  
  // Debug gallery data changes
  useEffect(() => {
    console.log('Admin - Gallery data updated:', galleryData);
  }, [galleryData]);
  const { services: contextServices, addService, updateService, deleteService } = useService();
  const { currentBranch, getCurrentBranchData, isSuperAdmin } = useBranch();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminRole, setAdminRole] = useState('admin');
  const [adminUser, setAdminUser] = useState(null);
  const [data, setData] = useState({
    appointments: [],
    services: [],
    stylists: [],
    clients: [],
    stats: [],
    settings: {},
    products: [],
    gallery: []
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editContext, setEditContext] = useState(''); // 'appointment' | 'stylist' only
  const [editData, setEditData] = useState({});
  const defaultProductCategories = ['shampoo','conditioner','treatment','styling','accessories'];
  const [productCategories, setProductCategories] = useState(defaultProductCategories);

  // Check admin authentication
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
    } else {
      try {
        const parsed = JSON.parse(admin);
        setAdminRole(parsed?.role || 'admin');
        setAdminUser(parsed);
        
        // Set up branch permissions if not already set
        if (!parsed.branches) {
          const updatedAdmin = {
            ...parsed,
            branches: ['powai', 'thane'], // Give access to all branches by default
            role: 'super_admin'
          };
          localStorage.setItem('admin', JSON.stringify(updatedAdmin));
          setAdminUser(updatedAdmin);
        }
      } catch {}
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleUpdateProfile = async (profileData) => {
    // Here you would call the API to update the admin profile
    console.log('Updating profile:', profileData);
    
    // Update local state
    setAdminUser(prev => ({
      ...prev,
      ...profileData
    }));
    
    // Update localStorage
    const updatedAdmin = { ...adminUser, ...profileData };
    localStorage.setItem('admin', JSON.stringify(updatedAdmin));
  };

  // Load data from API
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load appointments filtered by current branch
      const appointmentsResponse = await appointmentsAPI.getAll(currentBranch).catch(err => {
        console.error('Error loading appointments:', err);
        return { appointments: [] };
      });
      
      const [services, stylists, clients, analytics, settings, products] = await Promise.all([
        servicesAPI.getAll().catch(err => {
          console.error('Error loading services:', err);
          return [];
        }),
        stylistsAPI.getAll(currentBranch).catch(err => {
          console.error('Error loading stylists:', err);
          return { stylists: [] };
        }),
        clientsAPI.getAll().catch(err => {
          console.error('Error loading clients:', err);
          return [];
        }),
        analyticsAPI.getDashboardStats(currentBranch).catch(err => {
          console.error('Error loading analytics:', err);
          return { stats: [] };
        }),
        settingsAPI.get().catch(err => {
          console.error('Error loading settings:', err);
          return {};
        }),
        productsAPI.getAll().catch(err => {
          console.error('Error loading products:', err);
          return [];
        })
      ]);

      setData({
        appointments: appointmentsResponse?.appointments || [],
        services: services || [],
        stylists: stylists?.stylists || stylists || [],
        clients: clients || [],
        stats: analytics?.stats || [],
        settings: settings || {},
        products: products || []
      });
      // Merge categories discovered from products with defaults
      const discovered = Array.from(new Set((products || []).map(p => p.category).filter(Boolean)));
      setProductCategories(prev => Array.from(new Set([...(prev || []), ...discovered])));
    } catch (error) {
      console.error('Error loading data:', error);
      // Set default data to prevent crashes
      setData({
        appointments: [],
        services: [],
        stylists: [],
        clients: [],
        stats: [],
        settings: {},
        products: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated && currentBranch) {
      loadData();
    }
  }, [isAuthenticated, currentBranch]);

  // Handle CRUD operations for stylists and appointments only
  const handleAdd = (type) => {
    if (type === 'stylist' || type === 'appointment') {
      setModalType('add');
      setSelectedItem(null);
      setEditContext(type);
      // sensible defaults per context
      if (type === 'appointment') {
        setEditData({ client: '', service: '', date: '', time: '', status: 'pending' });
      } else if (type === 'stylist') {
        setEditData({ name: '', specialty: '', experience: '', status: 'active' });
      }
      setShowModal(true);
    }
  };

  const handleEdit = (item, type) => {
    if (type === 'stylist' || type === 'appointment') {
      setModalType('edit');
      setSelectedItem(item);
      setEditContext(type);
      if (type === 'appointment') {
        setEditData({ client: item.client, service: item.service, date: item.date, time: item.time, status: item.status });
      } else if (type === 'stylist') {
        setEditData({ name: item.name, specialty: item.specialty, experience: item.experience, status: item.status });
      }
      setShowModal(true);
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      if (editContext === 'appointment') {
        if (modalType === 'add') {
          await appointmentsAPI.create(editData);
        } else {
          await appointmentsAPI.update(selectedItem.id, editData);
        }
      } else if (editContext === 'stylist') {
        if (modalType === 'add') {
          await stylistsAPI.create(editData);
        } else {
          await stylistsAPI.update(selectedItem.id, editData);
        }
      }
      setShowModal(false);
      setSelectedItem(null);
      setEditData({});
      await loadData();
    } catch (error) {
      console.error('Save failed:', error);
      alert('Save failed');
    }
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
  const { stats = [], appointments: recentAppointments = [], services = [], stylists = [], products = [] } = data || {};

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
    { id: 'products', label: 'Products', icon: 'Package' },
    { id: 'stylists', label: 'Stylists', icon: 'Users' },
    { id: 'clients', label: 'Clients', icon: 'User' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
    { id: 'categories', label: 'Categories', icon: 'Tags' },
    { id: 'whatsapp', label: 'WhatsApp Test', icon: 'MessageCircle' },
    ...(adminRole === 'super_admin' ? [
      { id: 'settings', label: 'Settings', icon: 'Settings' },
      { id: 'admin', label: 'Admin', icon: 'Users' }
    ] : [])
  ];

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          adminRole={adminRole} 
          onLogout={handleLogout} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <AdminHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          adminRole={adminRole} 
          onLogout={handleLogout} 
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <AdminDashboard 
              stats={stats}
              recentAppointments={recentAppointments}
              services={services}
              stylists={stylists}
            />
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <CategoryManagement adminRole={adminRole} />
          )}

          {/* Notification Test Tab */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-semibold text-foreground">Notification Test</h2>
              </div>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Icon name="Loader2" size={24} className="animate-spin mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                <NotificationTest />
              )}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <AppointmentManagement
              appointments={recentAppointments}
              onAdd={(data) => handleAdd('appointment', data)}
              onEdit={(id, data) => handleEdit({ id, ...data }, 'appointment')}
              onDelete={(id) => handleDelete(id, 'appointment')}
              adminRole={adminRole}
            />
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <ServiceManagement
              services={contextServices}
              onAdd={addService}
              onEdit={updateService}
              onDelete={deleteService}
              adminRole={adminRole}
            />
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <ProductManagement
              products={products}
              onAdd={async (data) => {
                try {
                  await productsAPI.create(data);
                  await loadData();
                } catch (error) {
                  console.error('Error adding product:', error);
                  alert('Failed to add product');
                }
              }}
              onEdit={async (id, data) => {
                try {
                  await productsAPI.update(id, data);
                  await loadData();
                } catch (error) {
                  console.error('Error updating product:', error);
                  alert('Failed to update product');
                }
              }}
              onDelete={async (id) => {
                try {
                  await productsAPI.delete(id);
                  await loadData();
                } catch (error) {
                  console.error('Error deleting product:', error);
                  alert('Failed to delete product');
                }
              }}
              adminRole={adminRole}
            />
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <GalleryManagement
              galleryItems={galleryData}
              onAdd={addGalleryItem}
              onEdit={updateGalleryItem}
              onDelete={deleteGalleryItem}
              adminRole={adminRole}
            />
          )}

          {/* Homepage Gallery Tab */}
          {activeTab === 'homepage-gallery' && (
            <HomepageGallerySelector adminRole={adminRole} />
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <ClientManagement
              clients={data.clients || []}
              onAdd={async (clientData) => {
                try {
                  await clientsAPI.create(clientData);
                  await loadData();
                } catch (error) {
                  console.error('Error adding client:', error);
                  alert('Failed to add client');
                }
              }}
              onEdit={async (id, clientData) => {
                try {
                  await clientsAPI.update(id, clientData);
                  await loadData();
                } catch (error) {
                  console.error('Error updating client:', error);
                  alert('Failed to update client');
                }
              }}
              onDelete={async (id) => {
                try {
                  await clientsAPI.delete(id);
                  await loadData();
                } catch (error) {
                  console.error('Error deleting client:', error);
                  alert('Failed to delete client');
                }
              }}
              adminRole={adminRole}
            />
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
                      {adminRole === 'super_admin' && (
                      <Button 
                        size="xs" 
                        variant="outline"
                        onClick={() => handleDelete(stylist.id, 'stylist')}
                      >
                        <Icon name="Trash" size={12} />
                      </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add/Edit Modal for appointments/services/stylists/products */}
          {showModal && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4 max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {modalType === 'add' ? 'Add' : 'Edit'} {editContext.charAt(0).toUpperCase() + editContext.slice(1)}
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
                    <Icon name="X" size={16} />
                  </Button>
                </div>
                <form onSubmit={submitEdit} className="space-y-4 overflow-y-auto pr-1 min-h-0 flex-1">
                  {editContext === 'appointment' && (
                    <>
                      <label className="block text-sm font-medium text-foreground">Client</label>
                      <input className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.client} onChange={(e) => setEditData({ ...editData, client: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Service</label>
                      <input className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.service} onChange={(e) => setEditData({ ...editData, service: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Date</label>
                      <input type="date" className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Time</label>
                      <input type="text" className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.time} onChange={(e) => setEditData({ ...editData, time: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Status</label>
                      <select className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </>
                  )}
                  {editContext === 'stylist' && (
                    <>
                      <label className="block text-sm font-medium text-foreground">Name</label>
                      <input className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Specialty</label>
                      <input className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.specialty} onChange={(e) => setEditData({ ...editData, specialty: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Experience</label>
                      <input className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.experience} onChange={(e) => setEditData({ ...editData, experience: e.target.value })} />
                      <label className="block text-sm font-medium text-foreground">Status</label>
                      <select className="w-full mt-1 p-2 border border-border rounded-md bg-background" value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </>
                  )}
                  <div className="flex items-center justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button type="submit">{modalType === 'add' ? 'Create' : 'Save Changes'}</Button>
                  </div>
                </form>
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

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <AdminProfile 
              adminUser={adminUser} 
              onUpdateProfile={handleUpdateProfile} 
            />
          )}

          {/* Admin Management Tab */}
          {activeTab === 'admin' && (
            <AdminUserManagement />
          )}
          </div>
        </main>
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default Admin;
