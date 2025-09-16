import React, { useState } from 'react';
import { useCategory } from '../../../contexts/CategoryContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CategoryManagement = ({ adminRole }) => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategory();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Grid3X3',
    color: '#6B7280'
  });

  const iconOptions = [
    { value: 'Scissors', label: 'Scissors' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Sparkles', label: 'Sparkles' },
    { value: 'Hand', label: 'Hand' },
    { value: 'Palette', label: 'Palette' },
    { value: 'Grid3X3', label: 'Grid' },
    { value: 'Flower', label: 'Flower' },
    { value: 'Star', label: 'Star' },
    { value: 'Crown', label: 'Crown' },
    { value: 'Gem', label: 'Gem' }
  ];

  const colorOptions = [
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#EC4899', label: 'Pink' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Orange' },
    { value: '#EF4444', label: 'Red' },
    { value: '#3B82F6', label: 'Blue' },
    { value: '#6B7280', label: 'Gray' },
    { value: '#F97316', label: 'Orange Red' },
    { value: '#84CC16', label: 'Lime' },
    { value: '#06B6D4', label: 'Cyan' }
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      icon: 'Grid3X3',
      color: '#6B7280'
    });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      icon: category.icon || 'Grid3X3',
      color: category.color || '#6B7280'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        await addCategory(formData);
      }
      setFormData({
        name: '',
        icon: 'Grid3X3',
        color: '#6B7280'
      });
      setEditingCategory(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleDelete = async (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteCategory(category.id);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert(error.message || 'Failed to delete category. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setFormData({
      name: '',
      icon: 'Grid3X3',
      color: '#6B7280'
    });
    setEditingCategory(null);
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isDefaultCategory = (categoryId) => {
    const defaultIds = ['hair', 'nails', 'skincare', 'massage', 'makeup', 'other'];
    return defaultIds.includes(categoryId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Category Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage service categories for your salon
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Icon name="Plus" size={16} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon name={category.icon} size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {isDefaultCategory(category.id) ? 'Default' : 'Custom'}
                  </p>
                </div>
              </div>
              {adminRole === 'super_admin' && (
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                  >
                    <Icon name="Edit" size={12} />
                  </Button>
                  {!isDefaultCategory(category.id) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(category)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Icon name="Trash2" size={12} />
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              <div>Icon: {category.icon}</div>
              <div>Color: {category.color}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative bg-card rounded-lg shadow-luxury-hover max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseModal}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Category Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter category name"
                required
              />

              <Select
                label="Icon"
                value={formData.icon}
                onChange={(value) => handleInputChange('icon', value)}
                options={iconOptions}
              />

              <Select
                label="Color"
                value={formData.color}
                onChange={(value) => handleInputChange('color', value)}
                options={colorOptions}
              />

              {/* Color Preview */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Preview:</span>
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: formData.color }}
                >
                  <Icon name={formData.icon} size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium">{formData.name || 'Category Name'}</span>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;



