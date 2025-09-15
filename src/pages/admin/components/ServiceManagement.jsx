import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ImageUpload from '../../../components/ui/ImageUpload';
import Icon from '../../../components/AppIcon';
import { useCategory } from '../../../contexts/CategoryContext';
import CategoryManagement from './CategoryManagement';

const ServiceManagement = ({ services, onAdd, onEdit, onDelete, adminRole }) => {
  const { categories, getCategoriesForSelect } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
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
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      duration: '',
      category: 'hair',
      status: 'active',
      image: '',
      media: []
    });
    setShowModal(true);
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
          <Button 
            variant="outline" 
            onClick={() => setShowCategoryModal(true)} 
            className="w-fit"
          >
            <Icon name="Tags" size={16} className="mr-2" />
            Manage Categories
          </Button>
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
              icon="Search"
            />
          </div>
          <Select
            value={filterCategory}
            onChange={(value) => setFilterCategory(value)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...getCategoriesForSelect()
            ]}
          />
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            options={[
              { value: 'all', label: 'All Status' },
              ...statusOptions
            ]}
          />
          <div className="flex items-center space-x-2">
            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              options={[
                { value: 'name', label: 'Sort by Name' },
                { value: 'duration', label: 'Sort by Duration' },
                { value: 'category', label: 'Sort by Category' }
              ]}
            />
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Icon name="Grid" size={16} />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-l-none"
              >
                <Icon name="List" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedServices.map((service) => (
            <div key={service.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)} bg-muted ml-2`}>
                  {service.status.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm font-medium">{service.duration} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="text-sm font-medium capitalize">{service.category}</span>
                </div>
                {service.tags && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tags:</span>
                    <span className="text-sm font-medium">{service.tags}</span>
                  </div>
                )}
                {service.featured && (
                  <div className="flex items-center justify-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                      Featured
                    </span>
                  </div>
                )}
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
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedServices.map((service) => (
                  <tr key={service.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground">{service.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{service.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm capitalize">{service.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{service.duration} min</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)} bg-muted`}>
                        {service.status.replace('_', ' ')}
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
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseModal}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Service Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter service name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter short service description"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Description
                  </label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                    placeholder="Enter detailed service description"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <Input
                  label="Duration (minutes)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="60"
                  required
                />


                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(value) => handleInputChange('category', value)}
                  options={getCategoriesForSelect()}
                />

                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(value) => handleInputChange('status', value)}
                  options={statusOptions}
                />

                <div className="md:col-span-2">
                  <ImageUpload
                    label="Thumbnail Image (required)"
                    value={formData.image}
                    onChange={(value) => handleInputChange('image', value)}
                    placeholder="Upload service thumbnail"
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    Or enter image URL below:
                  </div>
                  <Input
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    label="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="haircut, styling, premium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-sm font-medium text-foreground">Featured Service</span>
                  </label>
                </div>

              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Icon name="Save" size={16} className="mr-2" />
                  {editingService ? 'Update Service' : 'Add Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedServices.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Scissors" size={48} className="mx-auto text-muted-foreground mb-4" />
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

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCategoryModal(false)}
          />
          <div className="relative bg-card rounded-lg shadow-luxury-hover max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Manage Categories
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCategoryModal(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="p-6">
              <CategoryManagement adminRole={adminRole} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
