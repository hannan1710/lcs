import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import MediaUpload from '../../../components/MediaUpload';

const ProductManagement = ({ products, onAdd, onEdit, onDelete, adminRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    category: 'shampoo',
    inStock: true,
    stockQuantity: 0,
    image: '',
    brand: '',
    media: []
  });

  const categories = ['shampoo', 'conditioner', 'treatment', 'styling', 'accessories', 'tools', 'other'];
  const sizes = ['50ml', '100ml', '150ml', '200ml', '250ml', '300ml', '500ml', '1L', 'Other'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStock = filterStock === 'all' || 
                        (filterStock === 'in_stock' && product.inStock) ||
                        (filterStock === 'out_of_stock' && !product.inStock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'stock':
        return (b.stockQuantity || 0) - (a.stockQuantity || 0);
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      size: '100ml',
      category: 'shampoo',
      inStock: true,
      stockQuantity: 0,
      image: '',
      brand: '',
      media: []
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      size: product.size || '100ml',
      category: product.category || 'shampoo',
      inStock: product.inStock !== undefined ? product.inStock : true,
      stockQuantity: product.stockQuantity || 0,
      image: product.image || '',
      brand: product.brand || '',
      media: product.media || []
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await onEdit(editingProduct.id, formData);
      } else {
        await onAdd(formData);
      }
      // Reset form data after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        size: '100ml',
        category: 'shampoo',
        inStock: true,
        stockQuantity: 0,
        image: '',
        brand: '',
        media: []
      });
      setEditingProduct(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
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
      name: '',
      description: '',
      price: '',
      size: '100ml',
      category: 'shampoo',
      inStock: true,
      stockQuantity: 0,
      image: '',
      brand: '',
      media: []
    });
    setEditingProduct(null);
    setShowModal(false);
  };

  const getStockStatus = (product) => {
    if (!product.inStock) return { text: 'Out of Stock', color: 'text-destructive' };
    if (product.stockQuantity === 0) return { text: 'Out of Stock', color: 'text-destructive' };
    if (product.stockQuantity < 10) return { text: 'Low Stock', color: 'text-warning' };
    return { text: 'In Stock', color: 'text-success' };
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Products Management</h2>
          <p className="text-muted-foreground">Manage your salon products and inventory</p>
        </div>
        <Button onClick={handleAdd} className="w-fit">
          <Icon name="Plus" size={16} className="mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search products..."
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
              ...categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
            ]}
          />
          <Select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            options={[
              { value: 'all', label: 'All Stock' },
              { value: 'in_stock', label: 'In Stock' },
              { value: 'out_of_stock', label: 'Out of Stock' }
            ]}
          />
          <div className="flex items-center space-x-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'name', label: 'Sort by Name' },
                { value: 'price', label: 'Sort by Price' },
                { value: 'category', label: 'Sort by Category' },
                { value: 'stock', label: 'Sort by Stock' }
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

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const stockStatus = getStockStatus(product);
            return (
              <div key={product.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-1">{product.name}</h3>
                    {product.brand && (
                      <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color} bg-muted ml-2`}>
                    {stockStatus.text}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-semibold text-accent">${product.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Size:</span>
                    <span className="text-sm font-medium">{product.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <span className="text-sm font-medium capitalize">{product.category}</span>
                  </div>
                  {product.stockQuantity !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stock:</span>
                      <span className="text-sm font-medium">{product.stockQuantity} units</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                    className="flex-1"
                  >
                    <Icon name="Edit" size={14} className="mr-2" />
                    Edit
                  </Button>
                  {adminRole === 'super_admin' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(product.id)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Icon name="Trash" size={14} />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Stock</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-foreground">{product.name}</div>
                          {product.brand && (
                            <div className="text-sm text-muted-foreground">{product.brand}</div>
                          )}
                          <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm capitalize">{product.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-accent">${product.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{product.size}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color} bg-muted w-fit`}>
                            {stockStatus.text}
                          </span>
                          {product.stockQuantity !== undefined && (
                            <span className="text-xs text-muted-foreground mt-1">
                              {product.stockQuantity} units
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                          >
                            <Icon name="Edit" size={14} className="mr-1" />
                            Edit
                          </Button>
                          {adminRole === 'super_admin' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onDelete(product.id)}
                              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                            >
                              <Icon name="Trash" size={14} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
                {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <Input
                  label="Brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Enter brand name"
                />

                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  options={categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter product description"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <Input
                  label="Price ($)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  required
                />

                <Select
                  label="Size"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  options={sizes.map(size => ({ value: size, label: size }))}
                />

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => handleInputChange('inStock', e.target.checked)}
                      className="rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-sm font-medium text-foreground">In Stock</span>
                  </label>
                </div>

                <Input
                  label="Stock Quantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Image URL (optional)"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <MediaUpload
                    onFilesChange={handleMediaChange}
                    onRemoveMedia={handleRemoveMedia}
                    existingMedia={formData.media}
                    maxFiles={15}
                    acceptedTypes="image/*,video/*"
                    maxSize={50 * 1024 * 1024} // 50MB
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
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || filterCategory !== 'all' || filterStock !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first product.'
            }
          </p>
          <Button onClick={handleAdd}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
