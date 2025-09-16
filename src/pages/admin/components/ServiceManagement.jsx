import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ImageUpload from '../../../components/ui/ImageUpload';
import Icon from '../../../components/AppIcon';
import { useCategory } from '../../../contexts/CategoryContext';
import CategoryManagement from './CategoryManagement';
import * as XLSX from 'xlsx';

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
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importType, setImportType] = useState('excel');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);
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

  // Import functionality
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
      setImportFile(file);
      const extension = file.name.split('.').pop().toLowerCase();
      console.log('File extension detected:', extension);
      
      if (['csv'].includes(extension)) {
        console.log('Setting import type to CSV');
        setImportType('csv');
      } else if (['xlsx', 'xls'].includes(extension)) {
        console.log('Setting import type to Excel');
        setImportType('excel');
      } else if (['pdf'].includes(extension)) {
        console.log('Setting import type to PDF');
        setImportType('pdf');
      } else {
        console.log('Unknown file type, defaulting to Excel');
        setImportType('excel');
      }
    }
  };

  const parseCSV = (csvText) => {
    console.log('CSV Parser - Raw text:', csvText);
    
    const lines = csvText.split('\n').filter(line => line.trim());
    console.log('CSV Parser - Lines:', lines);
    
    if (lines.length < 2) {
      console.log('CSV Parser - Not enough lines');
      return [];
    }
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    console.log('CSV Parser - Headers:', headers);
    
    const services = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        console.log(`CSV Parser - Processing line ${i}:`, line);
        
        // Handle CSV parsing more robustly - split by comma but handle quoted values
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim());
        
        console.log('CSV Parser - Parsed values:', values);
        
        const service = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || '';
          const headerLower = header.toLowerCase();
          
          console.log(`CSV Parser - Processing header "${header}" with value "${value}"`);
          
          if (headerLower.includes('name')) {
            service.name = value;
          } else if (headerLower.includes('price')) {
            service.price = parseFloat(value) || 0;
          } else if (headerLower.includes('duration')) {
            service.duration = value || '';
          } else if (headerLower.includes('category')) {
            service.category = value || 'hair'; // Default to 'hair' if no category
          } else if (headerLower.includes('description')) {
            service.description = value || '';
          } else if (headerLower.includes('status')) {
            service.status = value || 'active';
          }
        });
        
        console.log('CSV Parser - Parsed service:', service);
        
        if (service.name) {
          // Ensure all fields are present, even if empty
          const completeService = {
            name: service.name || '',
            price: service.price || 0, // Default to 0 if no price
            duration: service.duration || '30 min', // Default duration
            category: service.category || 'hair', // Default to 'hair' category
            description: service.description || service.name, // Use name as description if none provided
            status: service.status || 'active',
            image: '',
            tags: '',
            featured: false
          };
          services.push(completeService);
          console.log('CSV Parser - Added service:', completeService);
        } else {
          console.log('CSV Parser - Skipping row - no name found');
        }
      }
    }
    
    console.log('CSV Parser - Final services:', services);
    return services;
  };

  const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          console.log('Reading Excel file...');
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          console.log('Workbook sheets:', workbook.SheetNames);
          
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          console.log('Raw Excel data:', jsonData);
          
          if (jsonData.length < 2) {
            reject(new Error('Excel file must have at least a header row and one data row'));
            return;
          }
          
          const headers = jsonData[0].map(h => h ? h.toString().trim().toLowerCase() : '');
          console.log('Headers found:', headers);
          const services = [];
          
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            console.log(`Processing row ${i}:`, row);
            
            if (row.some(cell => cell !== undefined && cell !== '')) {
              const service = {};
              
              headers.forEach((header, index) => {
                const value = row[index] ? row[index].toString().trim() : '';
                const headerLower = header.toLowerCase();
                
                if (headerLower.includes('name')) {
                  service.name = value;
                } else if (headerLower.includes('price')) {
                  service.price = parseFloat(value) || 0;
                } else if (headerLower.includes('duration')) {
                  service.duration = value;
                } else if (headerLower.includes('category')) {
                  service.category = value || 'hair'; // Default to 'hair' if no category
                } else if (headerLower.includes('description')) {
                  service.description = value;
                } else if (headerLower.includes('status')) {
                  service.status = value || 'active';
                }
              });
              
              console.log('Parsed service:', service);
              
              if (service.name) {
                // Ensure all fields are present, even if empty
                const completeService = {
                  name: service.name || '',
                  price: service.price || 0, // Default to 0 if no price
                  duration: service.duration || '30 min', // Default duration
                  category: service.category || 'hair', // Default to 'hair' category
                  description: service.description || service.name, // Use name as description if none provided
                  status: service.status || 'active',
                  image: '',
                  tags: '',
                  featured: false
                };
                services.push(completeService);
                console.log('Added service to list:', completeService);
              } else {
                console.log('Skipping row - no name found');
              }
            }
          }
          
          console.log('Final services array:', services);
          resolve(services);
        } catch (error) {
          console.error('Error parsing Excel:', error);
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read Excel file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleImport = async () => {
    if (!importFile) {
      alert('Please select a file first!');
      return;
    }
    
    setIsImporting(true);
    try {
      let servicesToImport = [];
      
      console.log('=== IMPORT DEBUG START ===');
      console.log('Import type:', importType);
      console.log('File name:', importFile.name);
      console.log('File size:', importFile.size);
      console.log('File type:', importFile.type);
      
      if (importType === 'csv') {
        console.log('Processing CSV file...');
        const text = await importFile.text();
        console.log('CSV content (first 500 chars):', text.substring(0, 500));
        console.log('CSV content (full):', text);
        servicesToImport = parseCSV(text);
        console.log('CSV parsed result:', servicesToImport);
      } else if (importType === 'excel') {
        console.log('Processing Excel file...');
        servicesToImport = await parseExcel(importFile);
        console.log('Excel parsed result:', servicesToImport);
      } else if (importType === 'pdf') {
        alert('PDF files cannot be automatically parsed. Please convert your PDF to Excel or CSV format, or manually add services using the "Add New Service" button.');
        setIsImporting(false);
        return;
      }
      
      console.log('Total services to import:', servicesToImport.length);
      
      if (servicesToImport.length === 0) {
        alert('No valid services found in the file. Please check the format and try again.');
        setIsImporting(false);
        return;
      }
      
      // Validate and clean up services before importing
      const validCategoryIds = categories.map(cat => cat.id);
      console.log('Valid categories:', validCategoryIds);
      
      const cleanedServices = servicesToImport.map(service => ({
        ...service,
        category: validCategoryIds.includes(service.category) ? service.category : 'other'
      }));
      
      console.log('Cleaned services:', cleanedServices);
      
      // Import services one by one
      let successCount = 0;
      let errorCount = 0;
      
      for (const service of cleanedServices) {
        try {
          console.log('Attempting to add service:', service);
          const result = await onAdd(service);
          console.log('Service added successfully:', result);
          successCount++;
        } catch (error) {
          console.error('Error importing service:', service.name, error);
          errorCount++;
        }
      }
      
      console.log(`Import complete: ${successCount} successful, ${errorCount} failed`);
      console.log('=== IMPORT DEBUG END ===');
      
      if (successCount > 0) {
        alert(`Successfully imported ${successCount} services!${errorCount > 0 ? ` (${errorCount} failed)` : ''}`);
        setShowImportModal(false);
        setImportFile(null);
      } else {
        alert('No services were imported. Please check the file format and try again.');
      }
    } catch (error) {
      console.error('Error importing file:', error);
      alert(`Error importing file: ${error.message}. Please check the format and try again.`);
    } finally {
      setIsImporting(false);
    }
  };


  // Function to fix existing services with invalid categories
  const fixInvalidCategories = () => {
    const validCategoryIds = categories.map(cat => cat.id);
    const updatedServices = services.map(service => {
      if (service.category && !validCategoryIds.includes(service.category)) {
        return { ...service, category: 'other' };
      }
      return service;
    });
    
    // Update the services in the parent component
    if (onEdit) {
      updatedServices.forEach(service => {
        if (service.category === 'other' && !validCategoryIds.includes(service.category)) {
          onEdit(service.id, { category: 'other' });
        }
      });
    }
    
    alert('Invalid categories have been fixed! Services with invalid categories have been assigned to "Other" category.');
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
            onClick={() => setShowImportModal(true)} 
            className="w-fit"
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Import Services
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowCategoryModal(true)} 
            className="w-fit"
          >
            <Icon name="Tags" size={16} className="mr-2" />
            Manage Categories
          </Button>
          <Button 
            variant="outline" 
            onClick={fixInvalidCategories}
            className="w-fit bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100"
          >
            <Icon name="Wrench" size={16} className="mr-2" />
            Fix Categories
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

      {/* Import Services Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Import Services</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowImportModal(false)}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">File Type</label>
                <select
                  value={importType}
                  onChange={(e) => {
                    console.log('Manual file type change to:', e.target.value);
                    setImportType(e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="excel">Excel File (.xlsx)</option>
                  <option value="csv">CSV File</option>
                  <option value="pdf">PDF File</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Current type: {importType} | File: {importFile?.name || 'None selected'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={importType === 'csv' ? '.csv' : importType === 'excel' ? '.xlsx,.xls' : '.pdf'}
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {importFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {importFile.name}
                  </p>
                )}
              </div>
              
              {importType === 'excel' && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Excel File Support:</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your Excel file should have at least a Name column. Other columns are optional:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Name</strong> (required) - Service name</li>
                    <li>• Price (optional) - Defaults to 0 if not provided</li>
                    <li>• Duration (optional) - Defaults to "30 min" if not provided</li>
                    <li>• Category (optional) - Defaults to "hair" if not provided</li>
                    <li>• Description (optional) - Uses service name if not provided</li>
                    <li>• Status (optional) - Defaults to "active" if not provided</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Simple format:</strong> Just create an Excel file with one column "Name" and list your services.
                  </p>
                </div>
              )}
              
              {importType === 'csv' && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">CSV Format Requirements:</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your CSV should have at least a Name column. Other columns are optional:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Name</strong> (required) - Service name</li>
                    <li>• Price (optional) - Defaults to 0 if not provided</li>
                    <li>• Duration (optional) - Defaults to "30 min" if not provided</li>
                    <li>• Category (optional) - Defaults to "hair" if not provided</li>
                    <li>• Description (optional) - Uses service name if not provided</li>
                    <li>• Status (optional) - Defaults to "active" if not provided</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Simple format:</strong> Just create a CSV with one column "Name" and list your services.
                  </p>
                </div>
              )}
              
              {importType === 'pdf' && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Icon name="AlertTriangle" size={16} className="text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">PDF Import Notice</h4>
                      <p className="text-xs text-yellow-700 mt-1">
                        PDF files cannot be automatically parsed. Please convert your PDF to Excel or CSV format, or manually add services using the "Add New Service" button.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleImport}
                  disabled={!importFile || isImporting}
                  className="flex-1"
                >
                  {isImporting ? (
                    <>
                      <Icon name="Loader" size={16} className="mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size={16} className="mr-2" />
                      Import Services
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowImportModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
