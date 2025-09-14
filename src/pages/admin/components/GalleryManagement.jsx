import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import MediaUpload from '../../../components/MediaUpload';

const GalleryManagement = ({ galleryItems, onAdd, onEdit, onDelete, adminRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'hair',
    tags: '',
    featured: false,
    media: []
  });

  const categories = ['hair', 'nails', 'skincare', 'makeup', 'styling', 'before_after', 'other'];
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesType = filterType === 'all' || 
                       (filterType === 'image' && item.media?.some(media => media.type?.startsWith('image/'))) ||
                       (filterType === 'video' && item.media?.some(media => media.type?.startsWith('video/')));
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title?.localeCompare(b.title) || 0;
      case 'date':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'category':
        return a.category?.localeCompare(b.category) || 0;
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'hair',
      tags: '',
      featured: false,
      media: []
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'hair',
      tags: item.tags || '',
      featured: item.featured || false,
      media: item.media || []
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await onEdit(editingItem.id, formData);
      } else {
        await onAdd(formData);
      }
      // Reset form data after successful submission
      setFormData({
        title: '',
        description: '',
        category: 'hair',
        tags: '',
        featured: false,
        media: []
      });
      setEditingItem(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Failed to save gallery item. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMediaChange = (newMedia) => {
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia]
    }));
  };

  const handleRemoveMedia = (mediaId) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter(media => media.id !== mediaId)
    }));
  };

  const handleCloseModal = () => {
    setFormData({
      title: '',
      description: '',
      category: 'hair',
      tags: '',
      featured: false,
      media: []
    });
    setEditingItem(null);
    setShowModal(false);
  };

  const getMediaPreview = (item) => {
    if (!item.media || item.media.length === 0) return null;
    
    const firstMedia = item.media[0];
    if (firstMedia.type?.startsWith('image/')) {
      return (
        <img
          src={firstMedia.url || firstMedia.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      );
    } else if (firstMedia.type?.startsWith('video/')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <video
            src={firstMedia.url}
            className="w-full h-full object-cover"
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Play" size={24} className="text-white drop-shadow-lg" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Gallery Management</h2>
          <p className="text-muted-foreground">Manage your salon's photo and video gallery</p>
        </div>
        <Button onClick={handleAdd} className="w-fit">
          <Icon name="Plus" size={16} className="mr-2" />
          Add Gallery Item
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
            />
          </div>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ') }))
            ]}
          />
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={typeOptions}
          />
          <div className="flex items-center space-x-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'date', label: 'Sort by Date' },
                { value: 'title', label: 'Sort by Title' },
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

      {/* Gallery Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 group">
              <div className="aspect-square relative">
                {getMediaPreview(item) || (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Icon name="Image" size={48} className="text-muted-foreground" />
                  </div>
                )}
                {item.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="bg-background/80 hover:bg-background"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    {adminRole === 'super_admin' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(item.id)}
                        className="bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Icon name="Trash" size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{item.category.replace('_', ' ')}</span>
                  <span>{item.media?.length || 0} media</span>
                </div>
                {item.tags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.split(',').map((tag, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Preview</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Media Count</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Featured</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        {getMediaPreview(item) || (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon name="Image" size={24} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm capitalize">{item.category.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{item.media?.length || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      {item.featured ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <Icon name="Edit" size={14} className="mr-1" />
                          Edit
                        </Button>
                        {adminRole === 'super_admin' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDelete(item.id)}
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
          <div className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
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
                    label="Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter gallery item title"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  options={categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ') }))}
                />

                <Input
                  label="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="hair, styling, before-after"
                />

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-sm font-medium text-foreground">Featured Item</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <MediaUpload
                    onFilesChange={handleMediaChange}
                    onRemoveMedia={handleRemoveMedia}
                    existingMedia={formData.media}
                    maxFiles={20}
                    acceptedTypes="image/*,video/*"
                    maxSize={100 * 1024 * 1024} // 100MB
                  />
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
                  {editingItem ? 'Update Gallery Item' : 'Add Gallery Item'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Image" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No gallery items found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || filterCategory !== 'all' || filterType !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first gallery item.'
            }
          </p>
          <Button onClick={handleAdd}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Your First Gallery Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
