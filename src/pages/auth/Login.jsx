import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { authAPI } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    console.log('Validating form:', { isAdminMode, isLoginMode, formData });
    
    if (!isLoginMode && !isAdminMode) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = isAdminMode ? 'Username is required' : 'Email is required';
    } else if (!isAdminMode && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!isAdminMode && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginMode && !isAdminMode && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', { isAdminMode, isLoginMode, formData });
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      if (isAdminMode) {
        // Admin login
        console.log('Admin login attempt:', { username: formData.email, password: formData.password });
        const response = await authAPI.adminLogin({
          username: formData.email, // Use email field for username
          password: formData.password
        });
        
        console.log('Admin login response:', response);
        
        if (response.success) {
          localStorage.setItem('admin', JSON.stringify(response.user));
          localStorage.setItem('adminToken', response.token);
          navigate('/admin');
        } else {
          setErrors({ email: 'Invalid admin credentials' });
        }
      } else if (isLoginMode) {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          navigate('/dashboard');
        } else {
          setErrors({ email: 'Invalid credentials' });
        }
      } else {
        const response = await authAPI.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ email: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = (mode) => {
    console.log('Switching to mode:', mode);
    
    if (mode === 'admin') {
      setIsAdminMode(true);
      setIsLoginMode(false);
    } else if (mode === 'login') {
      setIsAdminMode(false);
      setIsLoginMode(true);
    } else {
      setIsAdminMode(false);
      setIsLoginMode(false);
    }
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
    setErrors({});
    
    console.log('Form cleared, new state:', { isAdminMode: mode === 'admin', isLoginMode: mode === 'login' });
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth
    console.log('Facebook login clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Scissors" size={32} color="white" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {isAdminMode ? 'Admin Access' : isLoginMode ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {isAdminMode ? 'Sign in to La Coiffure admin panel' : isLoginMode ? 'Sign in to your La Coiffure account' : 'Join La Coiffure for exclusive benefits'}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-muted rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => toggleMode('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-luxury ${
                  isLoginMode && !isAdminMode
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => toggleMode('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-luxury ${
                  !isLoginMode && !isAdminMode
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => toggleMode('admin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-luxury ${
                  isAdminMode
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Auth Form */}
            <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields (Register Mode Only) */}
                {!isLoginMode && !isAdminMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        error={errors.firstName}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        error={errors.lastName}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email/Username */}
                <div>
                  <Input
                    type={isAdminMode ? "text" : "email"}
                    label={isAdminMode ? "Username" : "Email Address"}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    placeholder={isAdminMode ? "Enter your username" : "Enter your email"}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={errors.password}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-luxury"
                    >
                      <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register Mode Only) */}
                {!isLoginMode && !isAdminMode && (
                  <div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        error={errors.confirmPassword}
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-luxury"
                      >
                        <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember Me & Forgot Password (Login Mode Only) */}
                {isLoginMode && !isAdminMode && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">Remember me</span>
                    </label>
                    <Link 
                      to="/forgot-password"
                      className="text-sm text-accent hover:text-accent/80 transition-luxury"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Loader" size={16} className="animate-spin" />
                      <span>{isAdminMode ? 'Signing in...' : isLoginMode ? 'Signing in...' : 'Creating account...'}</span>
                    </div>
                  ) : (
                    isAdminMode ? 'Admin Sign In' : isLoginMode ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>

              {/* Divider (Not for Admin Mode) */}
              {!isAdminMode && (
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                  </div>
                </div>
              )}

              {/* Social Login (Not for Admin Mode) */}
              {!isAdminMode && (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-muted"
                    onClick={handleGoogleLogin}
                  >
                    <Icon name="Chrome" size={16} className="mr-2" />
                    Continue with Google
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-muted"
                    onClick={handleFacebookLogin}
                  >
                    <Icon name="Facebook" size={16} className="mr-2" />
                    Continue with Facebook
                  </Button>
                </div>
              )}
            </div>

            {/* Mode Switch Link */}
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                {isAdminMode ? (
                  <>
                    Need regular access?{" "}
                    <button
                      type="button"
                      onClick={() => toggleMode('login')}
                      className="text-accent hover:text-accent/80 transition-luxury font-medium"
                    >
                      Sign in here
                    </button>
                  </>
                ) : isLoginMode ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => toggleMode('register')}
                      className="text-accent hover:text-accent/80 transition-luxury font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => toggleMode('login')}
                      className="text-accent hover:text-accent/80 transition-luxury font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
