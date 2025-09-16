import React, { useState, useEffect } from 'react';
import { useBranch } from '../../../contexts/BranchContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AdminUserManagement = () => {
  const { branches, isSuperAdmin } = useBranch();
  const [admins, setAdmins] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin',
    branches: [],
    isActive: true
  });

  // Load admins from API
  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/users');
        if (response.ok) {
          const adminsData = await response.json();
          setAdmins(adminsData);
        } else {
          console.error('Error loading admins from API');
          // Fallback to localStorage if API fails
          const savedAdmins = localStorage.getItem('salon_admins_data');
          if (savedAdmins) {
            setAdmins(JSON.parse(savedAdmins));
          }
        }
      } catch (error) {
        console.error('Error loading admins:', error);
        // Fallback to localStorage if API fails
        const savedAdmins = localStorage.getItem('salon_admins_data');
        if (savedAdmins) {
          setAdmins(JSON.parse(savedAdmins));
        }
      }
    };

    loadAdmins();
  }, []);

  // Save admins to localStorage
  useEffect(() => {
    if (admins.length > 0) {
      localStorage.setItem('salon_admins_data', JSON.stringify(admins));
    }
  }, [admins]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBranchToggle = (branchId) => {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.includes(branchId)
        ? prev.branches.filter(id => id !== branchId)
        : [...prev.branches, branchId]
    }));
  };

  const handleAddAdmin = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'admin',
      branches: [],
      isActive: true
    });
    setEditingAdmin(null);
    setShowAddModal(true);
  };

  const handleEditAdmin = (admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: '',
      role: admin.role,
      branches: admin.branches,
      isActive: admin.isActive
    });
    setEditingAdmin(admin);
    setShowAddModal(true);
  };

  const handleSaveAdmin = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || (!editingAdmin && !formData.password)) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.branches.length === 0) {
      alert('Please select at least one branch');
      return;
    }

    try {
      const adminData = {
        ...formData,
        id: editingAdmin ? editingAdmin.id : Date.now(),
        updatedAt: new Date().toISOString()
      };

      if (editingAdmin) {
        // Update existing admin via API
        const response = await fetch(`http://localhost:3001/api/admin/users/${editingAdmin.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: adminData.username,
            email: adminData.email,
            role: adminData.role,
            branches: adminData.branches
          })
        });

        if (response.ok) {
          setAdmins(prev => prev.map(admin => 
            admin.id === editingAdmin.id ? adminData : admin
          ));
          alert('Admin updated successfully!');
        } else {
          const error = await response.json();
          alert(`Error updating admin: ${error.message}`);
          return;
        }
      } else {
        // Create new admin via API
        console.log('Sending admin data:', {
          username: adminData.username,
          email: adminData.email,
          password: adminData.password,
          role: adminData.role,
          branches: adminData.branches
        });
        
        const response = await fetch('http://localhost:3001/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: adminData.username,
            email: adminData.email,
            password: adminData.password,
            role: adminData.role,
            branches: adminData.branches
          })
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (response.ok) {
          const responseText = await response.text();
          console.log('Response text:', responseText);
          
          let result;
          try {
            result = JSON.parse(responseText);
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            alert('Error: Server returned invalid response. Please try again.');
            return;
          }
          
          const newAdmin = {
            ...adminData,
            id: result.user.id,
            createdAt: result.user.createdAt
          };
          setAdmins(prev => [...prev, newAdmin]);
          console.log('New admin created:', newAdmin);
          alert(`Admin created successfully!\n\nUsername: ${adminData.username}\nEmail: ${adminData.email}\nPassword: ${adminData.password}\n\nThey can now login with these credentials.`);
        } else {
          const responseText = await response.text();
          console.error('Server error response text:', responseText);
          
          let error;
          try {
            error = JSON.parse(responseText);
          } catch (parseError) {
            console.error('Error response JSON parse error:', parseError);
            alert(`Error creating admin: Server returned invalid response (Status: ${response.status})`);
            return;
          }
          
          alert(`Error creating admin: ${error.message || 'Unknown error occurred'}`);
          return;
        }
      }

      setShowAddModal(false);
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'admin',
        branches: [],
        isActive: true
      });
      setEditingAdmin(null);
    } catch (error) {
      console.error('Error saving admin:', error);
      alert(`Error saving admin: ${error.message || 'Please try again.'}`);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const response = await fetch(`/api/admin/users/${adminId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setAdmins(prev => prev.filter(admin => admin.id !== adminId));
          alert('Admin deleted successfully!');
        } else {
          const error = await response.json();
          alert(`Error deleting admin: ${error.message}`);
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Error deleting admin. Please try again.');
      }
    }
  };

  const handleToggleAdminStatus = (adminId) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { ...admin, isActive: !admin.isActive, updatedAt: new Date().toISOString() }
        : admin
    ));
  };

  if (!isSuperAdmin()) {
    return (
      <div className="text-center py-8">
        <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Access Denied</h3>
        <p className="text-muted-foreground">Only super admins can manage admin users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Admin Management</h2>
          <p className="text-muted-foreground">Manage admin users and their branch access</p>
        </div>
        <Button onClick={handleAddAdmin}>
          <Icon name="Plus" size={16} className="mr-2" />
          Add Admin
        </Button>
      </div>

      {/* Admins List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Branches
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{admin.username}</div>
                      <div className="text-sm text-muted-foreground">{admin.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      admin.role === 'super_admin' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {admin.branches.map(branchId => {
                        const branch = branches.find(b => b.id === branchId);
                        return branch ? (
                          <span
                            key={branchId}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: `${branch.color}20`,
                              color: branch.color
                            }}
                          >
                            <div
                              className="w-2 h-2 rounded-full mr-1"
                              style={{ backgroundColor: branch.color }}
                            />
                            {branch.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      admin.isActive 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {admin.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAdmin(admin)}
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAdminStatus(admin.id)}
                        className={admin.isActive ? 'text-destructive hover:text-destructive-foreground hover:bg-destructive' : 'text-success hover:text-success-foreground hover:bg-success'}
                      >
                        <Icon name={admin.isActive ? 'UserX' : 'UserCheck'} size={14} />
                      </Button>
                      {admin.role !== 'super_admin' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        >
                          <Icon name="Trash" size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-card border border-border rounded-xl shadow-luxury max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <form onSubmit={handleSaveAdmin} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter username"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              
              <Input
                label={editingAdmin ? 'New Password (leave blank to keep current)' : 'Password'}
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter password"
                required={!editingAdmin}
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Branch Access *
                </label>
                <div className="space-y-2">
                  {branches.map((branch) => (
                    <label
                      key={branch.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/20 cursor-pointer transition-luxury"
                    >
                      <input
                        type="checkbox"
                        checked={formData.branches.includes(branch.id)}
                        onChange={() => handleBranchToggle(branch.id)}
                        className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: branch.color }}
                        />
                        <Icon name={branch.icon} size={16} />
                        <div>
                          <div className="font-medium text-foreground">{branch.name}</div>
                          <div className="text-xs text-muted-foreground">{branch.location}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-foreground">
                  Active (can login)
                </label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAdmin ? 'Update Admin' : 'Add Admin'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;


