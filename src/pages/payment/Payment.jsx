import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { paymentAPI } from '../../services/api';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    zipCode: ''
  });
  const [giftCardData, setGiftCardData] = useState({
    code: '',
    isValid: false,
    remainingAmount: 0,
    error: ''
  });
  const [errors, setErrors] = useState({});

  // Mock booking data from previous step
  const bookingData = location.state?.bookingData || {
    selectedServices: [
      { name: 'Signature Cut & Style', price: 150, duration: '90 min' }
    ],
    selectedStylist: { name: 'Isabella Martinez' },
    selectedDate: '2024-01-25',
    selectedTime: '10:00 AM',
    formData: { firstName: 'Sarah', lastName: 'Johnson' }
  };

  const subtotal = bookingData.selectedServices.reduce((sum, service) => sum + service.price, 0);
  const tax = subtotal * 0.08; // 8% tax
  const giftCardDiscount = giftCardData.isValid ? Math.min(giftCardData.remainingAmount, subtotal) : 0;
  const total = subtotal + tax - giftCardDiscount;

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'PayPal',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: 'Apple',
      description: 'Quick and secure payment'
    },
    {
      id: 'gift-card',
      name: 'Gift Card',
      icon: 'Gift',
      description: 'Redeem your gift card'
    }
  ];

  const handleCardInputChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleGiftCardValidation = async (code) => {
    if (!code.trim()) {
      setGiftCardData(prev => ({
        ...prev,
        code,
        isValid: false,
        remainingAmount: 0,
        error: ''
      }));
      return;
    }

    try {
      const response = await paymentAPI.validateGiftCard(code);
      if (response.success) {
        setGiftCardData({
          code,
          isValid: true,
          remainingAmount: response.giftCard.remainingAmount,
          error: ''
        });
      } else {
        setGiftCardData({
          code,
          isValid: false,
          remainingAmount: 0,
          error: response.error || 'Invalid gift card'
        });
      }
    } catch (error) {
      setGiftCardData({
        code,
        isValid: false,
        remainingAmount: 0,
        error: 'Failed to validate gift card'
      });
    }
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.number.trim()) {
      newErrors.number = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
      newErrors.number = 'Please enter a valid 16-digit card number';
    }
    
    if (!cardData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Please enter expiry date as MM/YY';
    }
    
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }
    
    if (!cardData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(cardData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card' && !validateCard()) {
      return;
    }

    if (paymentMethod === 'gift-card' && !giftCardData.isValid) {
      alert('Please enter a valid gift card code');
      return;
    }

    setIsProcessing(true);
    
    try {
      const paymentData = {
        amount: total,
        method: paymentMethod,
        bookingData,
        cardData: paymentMethod === 'card' ? cardData : null,
        giftCardCode: paymentMethod === 'gift-card' ? giftCardData.code : null
      };

      const response = await paymentAPI.processPayment(paymentData);
      
      if (response.success) {
        // Navigate to confirmation page
        navigate('/payment-confirmation', { 
          state: { 
            bookingData,
            paymentMethod,
            total,
            transactionId: response.transactionId,
            giftCardDiscount
          }
        });
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Complete Your Booking
              </h1>
              <p className="text-muted-foreground">
                Secure payment for your appointment at La Coiffure Salon
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-luxury ${
                          paymentMethod === method.id
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-accent focus:ring-accent"
                        />
                        <Icon name={method.icon} size={20} className="text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          label="Card Number"
                          value={cardData.number}
                          onChange={(e) => handleCardInputChange('number', formatCardNumber(e.target.value))}
                          error={errors.number}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Input
                            type="text"
                            label="Expiry Date"
                            value={cardData.expiry}
                            onChange={(e) => handleCardInputChange('expiry', formatExpiry(e.target.value))}
                            error={errors.expiry}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <Input
                            type="text"
                            label="CVV"
                            value={cardData.cvv}
                            onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                            error={errors.cvv}
                            placeholder="123"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Input
                          type="text"
                          label="Cardholder Name"
                          value={cardData.name}
                          onChange={(e) => handleCardInputChange('name', e.target.value)}
                          error={errors.name}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <Input
                          type="text"
                          label="ZIP Code"
                          value={cardData.zipCode}
                          onChange={(e) => handleCardInputChange('zipCode', e.target.value)}
                          error={errors.zipCode}
                          placeholder="12345"
                          maxLength="5"
                          required
                        />
                      </div>
                    </form>
                  )}

                  {/* Gift Card Details */}
                  {paymentMethod === 'gift-card' && (
                    <div className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          label="Gift Card Code"
                          value={giftCardData.code}
                          onChange={(e) => {
                            const code = e.target.value.toUpperCase();
                            setGiftCardData(prev => ({ ...prev, code }));
                            if (code.length >= 8) {
                              handleGiftCardValidation(code);
                            }
                          }}
                          error={giftCardData.error}
                          placeholder="Enter gift card code"
                          maxLength="20"
                          required
                        />
                      </div>
                      
                      {giftCardData.isValid && (
                        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="font-medium text-success">Valid Gift Card</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Remaining balance: <span className="font-medium text-foreground">${giftCardData.remainingAmount}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Other Payment Methods */}
                  {paymentMethod !== 'card' && paymentMethod !== 'gift-card' && (
                    <div className="text-center py-8">
                      <Icon name={paymentMethods.find(m => m.id === paymentMethod)?.icon} size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {paymentMethod === 'paypal' && 'You will be redirected to PayPal to complete your payment.'}
                        {paymentMethod === 'apple-pay' && 'Apple Pay will open to complete your payment.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Secure Payment</p>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
                  
                  {/* Booking Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">
                          {new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{bookingData.selectedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Icon name="User" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">
                          {bookingData.formData.firstName} {bookingData.formData.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">Client</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Icon name="Scissors" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{bookingData.selectedStylist.name}</p>
                        <p className="text-sm text-muted-foreground">Stylist</p>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-medium text-foreground">Services</h3>
                    {bookingData.selectedServices.map((service, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <p className="font-medium text-foreground">${service.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    {giftCardDiscount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gift Card Discount</span>
                        <span className="text-success">-${giftCardDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={isProcessing || (paymentMethod === 'gift-card' && !giftCardData.isValid)}
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Loader" size={20} className="animate-spin" />
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icon name="Lock" size={20} />
                      <span>Pay ${total.toFixed(2)}</span>
                    </div>
                  )}
                </Button>

                {/* Cancellation Policy */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    By completing this payment, you agree to our{' '}
                    <button className="text-accent hover:text-accent/80 underline">
                      cancellation policy
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
