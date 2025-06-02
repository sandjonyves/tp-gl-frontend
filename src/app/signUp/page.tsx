'use client'
import React, { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
    if (errors.userType) {
      setErrors(prev => ({
        ...prev,
        userType: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.userType) newErrors.userType = 'Please select user type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      alert('Account created successfully!');
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f8f4ff 0%, #e8f5ff 100%)'
    }}>
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-4xl animate-bounce opacity-20">✨</div>
      <div className="absolute top-40 right-20 text-3xl animate-pulse opacity-20">🚗</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-bounce opacity-20 delay-1000">💎</div>
      
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🚗</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Propelize
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-600">
          <a href="#" className="hover:text-pink-500 transition-colors">Cars</a>
          <a href="#" className="hover:text-pink-500 transition-colors">About</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all">
          Sign In
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-600 text-sm mb-4">
              ✨ Join the adventure!
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Create Your Account
              </span>
            </h1>
            <p className="text-gray-600">
              Start your journey with amazing cars and unforgettable experiences
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => handleUserTypeSelect('user')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      formData.userType === 'user'
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">👤</div>
                      <div className="font-semibold text-gray-800">Normal User</div>
                      <div className="text-xs text-gray-600 mt-1">Rent cars for personal use</div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleUserTypeSelect('admin')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      formData.userType === 'admin'
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">👑</div>
                      <div className="font-semibold text-gray-800">Administrator</div>
                      <div className="text-xs text-gray-600 mt-1">Manage cars and bookings</div>
                    </div>
                  </div>
                </div>
                {errors.userType && <p className="text-red-500 text-xs mt-2">{errors.userType}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Create Account ✨
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-pink-500 hover:text-pink-600 font-semibold">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center items-center space-x-16 py-12 opacity-70">
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            1000+
          </div>
          <div className="text-gray-600 text-sm">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            50+
          </div>
          <div className="text-gray-600 text-sm">Car Models</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            24/7
          </div>
          <div className="text-gray-600 text-sm">Support</div>
        </div>
      </div>
    </div>
  );
}