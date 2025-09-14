import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { paymentAPI } from '../../services/api';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { bookingData, paymentMethod, total, transactionId } = location.state || {};

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (transactionId) {
        try {
          // In a real app, you'd fetch the payment details from the backend
          // For now, we'll use the data from location.state
          setPaymentDetails({
            transactionId,
            amount: total,
            method: paymentMethod,
            status: 'completed',
            date: new Date().toISOString(),
            bookingData
          });
        } catch (error) {
          console.error('Error fetching payment details:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [transactionId, total, paymentMethod, bookingData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodIcon = (method) => {
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

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'apple-pay':
        return 'Apple Pay';
      case 'gift-card':
        return 'Gift Card';
      default:
        return 'Payment';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading payment confirmation...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertCircle" size={40} className="text-destructive" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Payment Not Found
              </h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find the payment details. Please contact support if you believe this is an error.
              </p>
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={40} className="text-success" />
              </div>
              
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Payment Successful!
              </h1>
              
              <p className="text-muted-foreground mb-4">
                Your payment has been processed successfully and your appointment is confirmed.
              </p>
              
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-lg">
                <Icon name="Shield" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">
                  Transaction ID: {paymentDetails.transactionId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Details */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Payment Details</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span className="text-2xl font-bold text-foreground">
                        ${paymentDetails.amount?.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Payment Method</span>
                      <div className="flex items-center space-x-2">
                        <Icon name={getPaymentMethodIcon(paymentDetails.method)} size={16} />
                        <span className="font-medium text-foreground">
                          {getPaymentMethodName(paymentDetails.method)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        {paymentDetails.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="font-medium text-foreground">
                        {formatDate(paymentDetails.date)} at {formatTime(paymentDetails.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Secure Transaction</p>
                      <p className="text-sm text-muted-foreground">
                        Your payment was processed securely using industry-standard encryption. 
                        You will receive a confirmation email shortly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Appointment Details</h2>
                  
                  {bookingData && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Calendar" size={20} className="text-accent" />
                        <div>
                          <p className="font-medium text-foreground">
                            {formatDate(bookingData.selectedDate)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {bookingData.selectedTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={20} className="text-accent" />
                        <div>
                          <p className="font-medium text-foreground">
                            {bookingData.formData?.firstName} {bookingData.formData?.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">Client</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Icon name="Scissors" size={20} className="text-accent" />
                        <div>
                          <p className="font-medium text-foreground">
                            {bookingData.selectedStylist?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">Stylist</p>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h3 className="font-medium text-foreground mb-2">Services</h3>
                        <div className="space-y-2">
                          {bookingData.selectedServices?.map((service, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-foreground">{service.name}</p>
                                <p className="text-sm text-muted-foreground">{service.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Next Steps */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">What's Next?</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-accent">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Confirmation Email</p>
                        <p className="text-sm text-muted-foreground">
                          Check your email for appointment confirmation and details
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-accent">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Appointment Reminder</p>
                        <p className="text-sm text-muted-foreground">
                          We'll send you a reminder 24 hours before your appointment
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-accent">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Prepare for Your Visit</p>
                        <p className="text-sm text-muted-foreground">
                          Arrive 15 minutes early and come with clean, dry hair
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="flex-1 sm:flex-none"
              >
                <Icon name="User" size={20} className="mr-2" />
                View Dashboard
              </Button>
              
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate('/appointment-booking')}
                className="flex-1 sm:flex-none bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Book Another Appointment
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/')}
                className="flex-1 sm:flex-none"
              >
                <Icon name="Home" size={20} className="mr-2" />
                Back to Home
              </Button>
            </div>

            {/* Additional Information */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{' '}
                <a href="mailto:support@lacoiffure.com" className="text-accent hover:text-accent/80">
                  support@lacoiffure.com
                </a>{' '}
                or call{' '}
                <a href="tel:+919967002481" className="text-accent hover:text-accent/80">
                  +91 99670 02481
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmation;
