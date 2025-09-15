import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import * as XLSX from 'xlsx';

const ClientManagement = ({ clients, onAdd, onEdit, onDelete, adminRole }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    totalSpent: '',
    appointmentsCount: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importType, setImportType] = useState('csv');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Number', 'Total', 'Appointments'],
      ...filteredClients.map(client => [
        client.name || '',
        client.phone || '',
        client.totalSpent || 0,
        client.appointmentsCount || 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'clients_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      notes: client.notes || '',
      totalSpent: client.totalSpent || '',
      appointmentsCount: client.appointmentsCount || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = (client) => {
    if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      onDelete(client.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await onEdit(editingClient.id, formData);
      } else {
        await onAdd(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Failed to save client. Please try again.');
    }
  };


  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingClient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
      totalSpent: '',
      appointmentsCount: ''
    });
  };

  // Import functionality
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImportFile(file);
      // Auto-detect file type
      const extension = file.name.split('.').pop().toLowerCase();
      if (['csv'].includes(extension)) {
        setImportType('csv');
      } else if (['xlsx', 'xls'].includes(extension)) {
        setImportType('excel');
      } else if (['pdf'].includes(extension)) {
        setImportType('pdf');
      }
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const clients = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim());
        const client = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || '';
          switch (header) {
            case 'name':
            case 'full name':
            case 'client name':
              client.name = value;
              break;
            case 'email':
            case 'email address':
              client.email = value;
              break;
            case 'phone':
            case 'phone number':
            case 'mobile':
              client.phone = value;
              break;
            case 'address':
              client.address = value;
              break;
            case 'notes':
            case 'note':
              client.notes = value;
              break;
          }
        });
        
        if (client.name && client.email) {
          clients.push(client);
        }
      }
    }
    
    return clients;
  };

  const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          console.log('Excel data:', jsonData);
          console.log('Number of rows:', jsonData.length);
          
          if (jsonData.length < 2) {
            reject(new Error('Excel file must have at least a header row and one data row'));
            return;
          }
          
          const headers = jsonData[0].map(h => h ? h.toString().trim().toLowerCase() : '');
          console.log('Headers found:', headers);
          
          const clients = [];
          
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            console.log(`Row ${i}:`, row);
            
            if (row.some(cell => cell !== undefined && cell !== '')) {
              const client = {};
              
              headers.forEach((header, index) => {
                const value = row[index] ? row[index].toString().trim() : '';
                console.log(`Header: "${header}", Value: "${value}"`);
                
                // More flexible header matching
                const headerLower = header.toLowerCase();
                
                if (headerLower.includes('name')) {
                  client.name = value;
                } else if (headerLower.includes('number') || headerLower.includes('phone') || headerLower.includes('mobile')) {
                  client.phone = value;
                } else if (headerLower.includes('total') && headerLower.includes('spent')) {
                  client.totalSpent = parseFloat(value) || 0;
                } else if (headerLower.includes('appointment')) {
                  client.appointmentsCount = parseInt(value) || 0;
                }
              });
              
              console.log('Parsed client:', client);
              
              if (client.name && client.phone) {
                clients.push(client);
                console.log('Client added to list');
              } else {
                console.log('Client rejected - missing name or phone:', { name: client.name, phone: client.phone });
              }
            }
          }
          
          console.log('Total clients parsed:', clients.length);
          resolve(clients);
        } catch (error) {
          console.error('Excel parsing error:', error);
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read Excel file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleImport = async () => {
    if (!importFile) return;
    
    setIsImporting(true);
    try {
      let clientsToImport = [];
      
      if (importType === 'csv') {
        const text = await importFile.text();
        clientsToImport = parseCSV(text);
      } else if (importType === 'excel') {
        clientsToImport = await parseExcel(importFile);
      } else if (importType === 'pdf') {
        // For PDF, we'll show a message that manual entry is needed
        alert('PDF import requires manual data entry. Please use CSV or Excel format for automatic import.');
        setIsImporting(false);
        return;
      }
      
      // Import clients one by one
      for (const client of clientsToImport) {
        try {
          await onAdd(client);
        } catch (error) {
          console.error('Error importing client:', client.name, error);
        }
      }
      
      alert(`Successfully imported ${clientsToImport.length} clients!`);
      setShowImportModal(false);
      setImportFile(null);
    } catch (error) {
      console.error('Error importing file:', error);
      alert(`Error importing file: ${error.message}. Please check the format and try again.`);
    } finally {
      setIsImporting(false);
    }
  };


  // Filter clients based on search term and status
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone?.includes(searchTerm);
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'active') return matchesSearch && client.status !== 'inactive';
    if (filterStatus === 'inactive') return matchesSearch && client.status === 'inactive';
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Client Management</h2>
          <p className="text-muted-foreground">Manage your client database and customer information</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowImportModal(true)}>
            <Icon name="Upload" size={16} className="mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Icon name="Download" size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search Clients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or phone..."
            icon="Search"
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status Filter</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="all">All Clients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Number
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Appointments
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{client.name}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-foreground">{client.phone || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-foreground font-medium">
                    ${client.totalSpent || 0}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">
                    {client.appointmentsCount || 0}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(client)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(client)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <Icon name="Trash" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No clients found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first client'}
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Client
          </Button>
        </div>
      )}

      {/* Add/Edit Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h3>
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter client's full name"
                required
              />
              
              <Input
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                required
              />
              
              <Input
                label="Total Spent"
                type="number"
                value={formData.totalSpent}
                onChange={(e) => handleInputChange('totalSpent', e.target.value)}
                placeholder="Enter total amount spent"
              />
              
              <Input
                label="Appointments Count"
                type="number"
                value={formData.appointmentsCount}
                onChange={(e) => handleInputChange('appointmentsCount', e.target.value)}
                placeholder="Enter number of appointments"
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any notes about this client..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingClient ? 'Update Client' : 'Add Client'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Import Clients</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowImportModal(false)}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">File Type</label>
                <select
                  value={importType}
                  onChange={(e) => setImportType(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="csv">CSV File</option>
                  <option value="excel">Excel File (.xlsx)</option>
                  <option value="pdf">PDF File</option>
                </select>
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
              
              {importType === 'csv' && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">CSV Format Requirements:</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your CSV should have these columns (in any order):
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Name (required)</li>
                    <li>• Email (required)</li>
                    <li>• Phone</li>
                    <li>• Address</li>
                    <li>• Notes</li>
                  </ul>
                </div>
              )}
              
              {importType === 'excel' && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Excel File Support:</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your Excel file should have these columns (in any order):
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Name</strong> (required)</li>
                    <li>• <strong>Number</strong> (required)</li>
                    <li>• Total Spent (optional)</li>
                    <li>• Appointments Count (optional)</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Only Name and Phone are required. Other columns are optional.
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
                        PDF files require manual data entry. Please use CSV format for automatic import.
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
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size={16} className="mr-2" />
                      Import Clients
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

export default ClientManagement;
