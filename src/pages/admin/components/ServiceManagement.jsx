import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ImageUpload from '../../../components/ui/ImageUpload';
import Icon from '../../../components/AppIcon';
import { useCategory } from '../../../contexts/CategoryContext';

const ServiceManagement = ({ services, onAdd, onEdit, onDelete, adminRole }) => {
  const { categories, getCategoriesForSelect } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    duration: '',
    category: 'hair',
    status: 'active',
    image: '',
    tags: '',
    featured: false
  });
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'text-success' },
    { value: 'inactive', label: 'Inactive', color: 'text-muted-foreground' },
    { value: 'coming_soon', label: 'Coming Soon', color: 'text-warning' }
  ];

  const filteredServices = (services || []).filter(service => {
    const matchesSearch = service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedServices = filteredServices.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name?.localeCompare(b.name);
      case 'category':
        return a.category?.localeCompare(b.category);
      case 'status':
        return a.status?.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      fullDescription: '',
      duration: '',
      category: 'hair',
      status: 'active',
      image: '',
      tags: '',
      featured: false
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await onEdit(editingService.id, formData);
      } else {
        await onAdd(formData);
      }
      // Reset form data after successful submission
      setFormData({
        name: '',
        description: '',
        fullDescription: '',
        duration: '',
        category: 'hair',
        status: 'active',
        image: '',
        tags: '',
        featured: false
      });
      setEditingService(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || '',
      description: service.description || '',
      fullDescription: service.fullDescription || '',
      duration: service.duration || '',
      category: service.category || 'hair',
      status: service.status || 'active',
      image: service.image || '',
      tags: service.tags || '',
      featured: service.featured || false
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setFormData({
      name: '',
      description: '',
      duration: '',
      category: 'hair',
      status: 'active',
      image: '',
      media: []
    });
    setEditingService(null);
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Services Management</h2>
          <p className="text-muted-foreground">Manage your salon services and pricing</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAdd} className="w-fit">
            <Icon name="Plus" size={16} className="mr-2" />
            Add New Service
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconName="Search"
            />
          </div>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...getCategoriesForSelect()
            ]}
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              ...statusOptions
            ]}
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'name', label: 'Sort by Name' },
              { value: 'category', label: 'Sort by Category' },
              { value: 'status', label: 'Sort by Status' }
            ]}
          />
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {sortedServices.length} service{sortedServices.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Icon name="Grid" size={16} />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>

      {/* Services Display */}
      {sortedServices.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.map((service) => (
              <div key={service.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-luxury transition-luxury">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">
                          {service.duration || '30 min'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                        {service.featured && (
                          <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                      className="flex-1"
                    >
                      <Icon name="Edit" size={14} className="mr-2" />
                      Edit
                    </Button>
                    {adminRole === 'super_admin' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(service.id)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <Icon name="Trash" size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sortedServices.map((service) => (
                    <tr key={service.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-foreground">{service.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {service.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {service.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {service.duration || '30 min'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(service)}
                          >
                            <Icon name="Edit" size={14} className="mr-1" />
                            Edit
                          </Button>
                          {adminRole === 'super_admin' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onDelete(service.id)}
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
        )
      ) : (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No services found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first service.'
            }
          </p>
          <Button onClick={handleAdd}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Your First Service
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl shadow-luxury max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Service Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter service name"
                    required
                  />
                </div>
                <div>
                  <Select
                    label="Category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    options={getCategoriesForSelect()}
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                  placeholder="Detailed description of the service"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 60 min"
                  />
                </div>
                <div>
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    options={statusOptions}
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Service Image"
                  value={formData.image}
                  onChange={(value) => handleInputChange('image', value)}
                />
              </div>

              <div>
                <Input
                  label="Tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="e.g., hair, color, cut (comma separated)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
                />
                <label htmlFor="featured" className="text-sm font-medium text-foreground">
                  Featured Service
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {editingService ? 'Update Service' : 'Add Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;