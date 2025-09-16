import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { useBranch } from '../../../contexts/BranchContext';
import { authAPI } from '../../../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { branches, setAdminBranches, setCurrentBranch } = useBranch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Try API login first
      try {
        const response = await authAPI.adminLogin({
          username: formData.username,
          email: formData.username, // Support email as username
          password: formData.password,
        });

        if (response.success) {
          // Store admin data in localStorage
          localStorage.setItem('admin', JSON.stringify(response.user));
          
          // Set admin branches and current branch in context
          // For now, set default branches - in real app, this would come from the API response
          const defaultBranches = ['powai', 'thane'];
          setAdminBranches(defaultBranches);
          setCurrentBranch(defaultBranches[0]);
          
          // Navigate to admin panel
          navigate('/admin');
          return;
        }
      } catch (apiError) {
        // If API fails, fall back to local storage check
        console.log('API login failed, trying local storage...');
      }

      // Fallback to local storage check
      const savedAdmins = localStorage.getItem('salon_admins_data');
      const admins = savedAdmins ? JSON.parse(savedAdmins) : [];
      
      // Find admin by username or email
      const admin = admins.find(a => 
        (a.username === formData.username || a.email === formData.username) && 
        a.isActive
      );
      
      if (!admin) {
        setErrors({ general: 'Username or email not found. Please check your credentials.' });
        setIsLoading(false);
        return;
      }

      // For demo purposes, accept any password
      // In real app, verify password hash
      const adminData = {
        ...admin,
        loginTime: new Date().toISOString()
      };

      // Store admin data in localStorage
      localStorage.setItem('admin', JSON.stringify(adminData));
      
      // Set admin branches and current branch in context
      setAdminBranches(admin.branches || ['powai', 'thane']);
      setCurrentBranch(admin.branches?.[0] || 'powai');
      
      // Navigate to admin panel
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl p-8 shadow-luxury">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4">
              <img 
                src="/lcsg.png" 
                alt="La Coiffure Salon Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground">
              La-Coiffure Salon dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {errors.general}
              </div>
            )}

            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
              error={errors.username}
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              error={errors.password}
              required
            />


            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
           
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
