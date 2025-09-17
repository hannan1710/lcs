import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const NotificationTest = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    branch: 'powai',
    message: '',
    notificationType: 'email'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      let endpoint = '';
      let payload = { ...formData };

      if (formData.notificationType === 'email') {
        endpoint = 'http://localhost:3001/api/email/test';
        payload = {
          email: formData.email,
          branch: formData.branch,
          message: formData.message
        };
      } else {
        endpoint = 'http://localhost:3001/api/sms/test';
        payload = {
          phoneNumber: formData.phoneNumber,
          branch: formData.branch,
          message: formData.message
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to send test notification',
        details: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Notification Test
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Notification Type"
            value={formData.notificationType}
            onChange={(e) => handleInputChange('notificationType', e.target.value)}
            options={[
              { value: 'email', label: 'Email Notification' },
              { value: 'sms', label: 'SMS Notification' }
            ]}
          />
          
          {formData.notificationType === 'email' ? (
            <Input
              label="Email Address"
              type="email"
              placeholder="test@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          ) : (
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+919876543210"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              required
            />
          )}
          
          <Select
            label="Branch"
            value={formData.branch}
            onChange={(e) => handleInputChange('branch', e.target.value)}
            options={[
              { value: 'powai', label: 'Powai Branch' },
              { value: 'thane', label: 'Thane Branch' }
            ]}
          />
          
          <Input
            label="Custom Message (Optional)"
            type="text"
            placeholder="Leave empty for default test message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Icon name={formData.notificationType === 'email' ? 'Mail' : 'MessageCircle'} size={16} className="mr-2" />
                Send Test {formData.notificationType === 'email' ? 'Email' : 'SMS'}
              </>
            )}
          </Button>
        </form>
        
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result.success 
              ? 'bg-success/10 border border-success/20' 
              : 'bg-error/10 border border-error/20'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={result.success ? "CheckCircle" : "XCircle"} 
                size={16} 
                className={result.success ? "text-success" : "text-error"} 
              />
              <p className={`font-medium ${
                result.success ? "text-success" : "text-error"
              }`}>
                {result.message}
              </p>
            </div>
            
            {result.details && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">Details:</p>
                <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-2">Configuration Required:</h4>
        <p className="text-sm text-muted-foreground mb-2">
          To enable WhatsApp notifications, you need to:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Set up WhatsApp Business API</li>
          <li>Get your Access Token and Phone Number ID</li>
          <li>Set environment variables: WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID</li>
          <li>Update the BRANCH_NUMBERS in server.js with your actual WhatsApp numbers</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationTest;




