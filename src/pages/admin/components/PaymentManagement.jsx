import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { paymentAPI } from '../../../services/api';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState({
    reason: '',
    amount: ''
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    method: ''
  });

  useEffect(() => {
    fetchPayments();
    fetchAnalytics();
  }, [filters]);

  const fetchPayments = async () => {
    try {
      const response = await paymentAPI.getPaymentHistory({
        limit: 50,
        offset: 0
      });
      setPayments(response.payments || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await paymentAPI.getPaymentAnalytics({
        startDate: filters.startDate,
        endDate: filters.endDate
      });
      setAnalytics(response);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleRefund = async () => {
    if (!selectedPayment || !refundData.reason || !refundData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await paymentAPI.processRefund({
        paymentId: selectedPayment.id,
        reason: refundData.reason,
        amount: parseFloat(refundData.amount)
      });

      if (response.success) {
        alert('Refund processed successfully');
        setShowRefundModal(false);
        setSelectedPayment(null);
        setRefundData({ reason: '', amount: '' });
        fetchPayments();
      } else {
        alert('Refund failed: ' + response.error);
      }
    } catch (error) {
      console.error('Refund error:', error);
      alert('Refund processing failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      case 'refunded':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return 'CreditCard';
      case 'paypal':
        return 'PayPal';
      case 'apple-pay':
        return 'Apple';
      case 'gift-card':
        return 'Gift';
      default:
        return 'CreditCard';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Payment Management</h2>
          <p className="text-muted-foreground">Manage payments, refunds, and view analytics</p>
        </div>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">
                  ${analytics.totalRevenue?.toFixed(2)}
                </p>
              </div>
              <Icon name="DollarSign" size={24} className="text-accent" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold text-foreground">
                  {analytics.totalTransactions}
                </p>
              </div>
              <Icon name="CreditCard" size={24} className="text-accent" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Transaction</p>
                <p className="text-2xl font-bold text-foreground">
                  ${analytics.averageTransaction?.toFixed(2)}
                </p>
              </div>
              <Icon name="TrendingUp" size={24} className="text-accent" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {analytics.statusBreakdown?.completed || 0}%
                </p>
              </div>
              <Icon name="CheckCircle" size={24} className="text-accent" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Start Date
            </label>
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              End Date
            </label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Payment Method
            </label>
            <select
              value={filters.method}
              onChange={(e) => setFilters(prev => ({ ...prev, method: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">All Methods</option>
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="apple-pay">Apple Pay</option>
              <option value="gift-card">Gift Card</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Payment History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Transaction ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Method</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm text-foreground font-mono">
                    {payment.transactionId}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    ${payment.amount?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name={getMethodIcon(payment.method)} size={16} />
                      <span className="capitalize">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      {payment.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setRefundData({ reason: '', amount: payment.amount });
                            setShowRefundModal(true);
                          }}
                        >
                          <Icon name="RotateCcw" size={16} />
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

      {/* Payment Details Modal */}
      {selectedPayment && !showRefundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPayment(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-foreground">{selectedPayment.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium text-foreground">${selectedPayment.amount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="capitalize text-foreground">{selectedPayment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPayment.status)}`}>
                  {selectedPayment.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground">{formatDate(selectedPayment.date)}</span>
              </div>
              {selectedPayment.service && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="text-foreground">{selectedPayment.service}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Process Refund</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedPayment(null);
                  setRefundData({ reason: '', amount: '' });
                }}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Refund Amount
                </label>
                <Input
                  type="number"
                  value={refundData.amount}
                  onChange={(e) => setRefundData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Enter refund amount"
                  max={selectedPayment.amount}
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Reason for Refund
                </label>
                <textarea
                  value={refundData.reason}
                  onChange={(e) => setRefundData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Enter reason for refund"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRefundModal(false);
                    setSelectedPayment(null);
                    setRefundData({ reason: '', amount: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRefund}
                  disabled={!refundData.reason || !refundData.amount}
                >
                  Process Refund
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
