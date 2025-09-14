import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AppointmentManagement = ({ appointments, onAdd, onEdit, onDelete, adminRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('table');
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    stylist: '',
    date: '',
    time: '',
    status: 'confirmed',
    notes: ''
  });

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmed', color: 'text-success' },
    { value: 'pending', label: 'Pending', color: 'text-warning' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-destructive' },
    { value: 'completed', label: 'Completed', color: 'text-accent' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    let matchesDate = true;
    if (filterDate !== 'all') {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (filterDate) {
        case 'today':
          matchesDate = appointmentDate.toDateString() === today.toDateString();
          break;
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          matchesDate = appointmentDate.toDateString() === tomorrow.toDateString();
          break;
        case 'this_week':
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          matchesDate = appointmentDate >= weekStart && appointmentDate <= weekEnd;
          break;
        case 'upcoming':
          matchesDate = appointmentDate >= today;
          break;
        case 'past':
          matchesDate = appointmentDate < today;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'client':
        return a.clientName?.localeCompare(b.clientName) || 0;
      case 'service':
        return a.service?.localeCompare(b.service) || 0;
      case 'status':
        return a.status?.localeCompare(b.status) || 0;
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingAppointment(null);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      stylist: '',
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      status: 'confirmed',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      clientName: appointment.clientName || '',
      clientEmail: appointment.clientEmail || '',
      clientPhone: appointment.clientPhone || '',
      service: appointment.service || '',
      stylist: appointment.stylist || '',
      date: appointment.date || '',
      time: appointment.time || '10:00',
      status: appointment.status || 'confirmed',
      notes: appointment.notes || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAppointment) {
      onEdit(editingAppointment.id, formData);
    } else {
      onAdd(formData);
    }
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Appointments Management</h2>
          <p className="text-muted-foreground">Manage client appointments and bookings</p>
        </div>
        <Button onClick={handleAdd} className="w-fit">
          <Icon name="Plus" size={16} className="mr-2" />
          Add New Appointment
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
            />
          </div>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              ...statusOptions
            ]}
          />
          <Select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            options={[
              { value: 'all', label: 'All Dates' },
              { value: 'today', label: 'Today' },
              { value: 'tomorrow', label: 'Tomorrow' },
              { value: 'this_week', label: 'This Week' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'past', label: 'Past' }
            ]}
          />
          <div className="flex items-center space-x-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'date', label: 'Sort by Date' },
                { value: 'client', label: 'Sort by Client' },
                { value: 'service', label: 'Sort by Service' },
                { value: 'status', label: 'Sort by Status' }
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

      {/* Appointments Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">{appointment.clientName}</h3>
                  <p className="text-sm text-muted-foreground">{appointment.clientEmail}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)} bg-muted ml-2`}>
                  {appointment.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Service:</span>
                  <span className="text-sm font-medium">{appointment.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Stylist:</span>
                  <span className="text-sm font-medium">{appointment.stylist}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm font-medium">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span className="text-sm font-medium">{formatTime(appointment.time)}</span>
                </div>
                {appointment.notes && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Notes:</span>
                    <p className="text-sm text-foreground mt-1">{appointment.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(appointment)}
                  className="flex-1"
                >
                  <Icon name="Edit" size={14} className="mr-2" />
                  Edit
                </Button>
                {adminRole === 'super_admin' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(appointment.id)}
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Stylist</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground">{appointment.clientName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.clientEmail}</div>
                        {appointment.clientPhone && (
                          <div className="text-sm text-muted-foreground">{appointment.clientPhone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">{appointment.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{appointment.stylist}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium">{formatDate(appointment.date)}</div>
                        <div className="text-sm text-muted-foreground">{formatTime(appointment.time)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)} bg-muted`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(appointment)}
                        >
                          <Icon name="Edit" size={14} className="mr-1" />
                          Edit
                        </Button>
                        {adminRole === 'super_admin' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDelete(appointment.id)}
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
                {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Client Name"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client name"
                  required
                />

                <Input
                  label="Client Email"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="Enter client email"
                  required
                />

                <Input
                  label="Client Phone"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="Enter client phone"
                />

                <Input
                  label="Service"
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  placeholder="Enter service name"
                  required
                />

                <Input
                  label="Stylist"
                  value={formData.stylist}
                  onChange={(e) => handleInputChange('stylist', e.target.value)}
                  placeholder="Enter stylist name"
                  required
                />

                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  options={statusOptions}
                />

                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />

                <Select
                  label="Time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  options={timeSlots.map(time => ({ value: time, label: formatTime(time) }))}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any additional notes"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Icon name="Save" size={16} className="mr-2" />
                  {editingAppointment ? 'Update Appointment' : 'Add Appointment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedAppointments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No appointments found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || filterStatus !== 'all' || filterDate !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first appointment.'
            }
          </p>
          <Button onClick={handleAdd}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Your First Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;

