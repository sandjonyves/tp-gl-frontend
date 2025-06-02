'use client'
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Users, Car, BookOpen, Settings, BarChart3, Heart, Eye, Filter, Grid, List, Star, MapPin, Fuel, Transmission, Calendar, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for cars
  const [cars, setCars] = useState([
    {
      id: 1,
      name: 'Ocean Breeze',
      type: 'Convertible',
      price: 89,
      location: 'Miami Beach',
      seats: 2,
      rating: 4.9,
      reviews: 156,
      fuel: 'Gasoline',
      transmission: 'Automatic',
      features: ['GPS', 'Bluetooth', 'AC'],
      popular: true,
      image: '🏎️',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Luxury Cruiser',
      type: 'Sedan',
      price: 120,
      location: 'Airport',
      seats: 4,
      rating: 4.8,
      reviews: 89,
      fuel: 'Gasoline',
      transmission: 'Automatic',
      features: ['Leather Seats', 'Premium Sound', 'GPS'],
      popular: true,
      image: '🚗',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Eco Friendly',
      type: 'Electric',
      price: 75,
      location: 'Tech District',
      seats: 4,
      rating: 4.9,
      reviews: 267,
      fuel: 'Electric',
      transmission: 'Automatic',
      features: ['Fast Charging', 'Autopilot', 'Premium Interior'],
      popular: true,
      image: '⚡',
      availability: 'Rented'
    }
  ]);

  const [newCar, setNewCar] = useState({
    name: '',
    type: '',
    price: '',
    location: '',
    seats: '',
    fuel: '',
    transmission: '',
    features: [],
    image: '',
    popular: false
  });

  const stats = [
    { title: 'Total Cars', value: '156', icon: Car, change: '+12%' },
    { title: 'Active Bookings', value: '89', icon: BookOpen, change: '+5%' },
    { title: 'Total Users', value: '2,847', icon: Users, change: '+18%' },
    { title: 'Revenue', value: '$45,678', icon: DollarSign, change: '+23%' }
  ];

  const handleAddCar = () => {
    if (newCar.name && newCar.type && newCar.price) {
      setCars([...cars, { 
        ...newCar, 
        id: cars.length + 1, 
        rating: 0, 
        reviews: 0,
        availability: 'Available',
        features: newCar.features.filter(f => f.trim() !== '')
      }]);
      setNewCar({
        name: '', type: '', price: '', location: '', seats: '', 
        fuel: '', transmission: '', features: [], image: '', popular: false
      });
      setShowAddModal(false);
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setNewCar(car);
    setShowAddModal(true);
  };

  const handleUpdateCar = () => {
    setCars(cars.map(car => car.id === editingCar.id ? { ...newCar, id: editingCar.id } : car));
    setEditingCar(null);
    setNewCar({
      name: '', type: '', price: '', location: '', seats: '', 
      fuel: '', transmission: '', features: [], image: '', popular: false
    });
    setShowAddModal(false);
  };

  const handleDeleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CarModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {editingCar ? 'Edit Car' : 'Add New Car'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
            <input
              type="text"
              value={newCar.name}
              onChange={(e) => setNewCar({...newCar, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter car name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newCar.type}
              onChange={(e) => setNewCar({...newCar, type: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Select type</option>
              <option value="Convertible">Convertible</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Luxury">Luxury</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price per day ($)</label>
            <input
              type="number"
              value={newCar.price}
              onChange={(e) => setNewCar({...newCar, price: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="89"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={newCar.location}
              onChange={(e) => setNewCar({...newCar, location: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Miami Beach"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
            <input
              type="number"
              value={newCar.seats}
              onChange={(e) => setNewCar({...newCar, seats: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="4"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <select
              value={newCar.fuel}
              onChange={(e) => setNewCar({...newCar, fuel: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Select fuel type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
            <select
              value={newCar.transmission}
              onChange={(e) => setNewCar({...newCar, transmission: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Select transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Emoji</label>
            <input
              type="text"
              value={newCar.image}
              onChange={(e) => setNewCar({...newCar, image: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="🚗"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
          <input
            type="text"
            value={Array.isArray(newCar.features) ? newCar.features.join(', ') : ''}
            onChange={(e) => setNewCar({...newCar, features: e.target.value.split(',').map(f => f.trim())})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="GPS, Bluetooth, AC"
          />
        </div>
        
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="popular"
            checked={newCar.popular}
            onChange={(e) => setNewCar({...newCar, popular: e.target.checked})}
            className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="popular" className="ml-2 text-sm text-gray-700">Mark as Popular</label>
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              setShowAddModal(false);
              setEditingCar(null);
              setNewCar({
                name: '', type: '', price: '', location: '', seats: '', 
                fuel: '', transmission: '', features: [], image: '', popular: false
              });
            }}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={editingCar ? handleUpdateCar : handleAddCar}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            {editingCar ? 'Update Car' : 'Add Car'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Propelize Admin
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <span>Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'cars', name: 'Cars Management', icon: Car },
                { id: 'bookings', name: 'Bookings', icon: BookOpen },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setActiveTab('cars');
                    setShowAddModal(true);
                  }}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Car</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105">
                  <Eye className="w-5 h-5" />
                  <span>View All Bookings</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105">
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cars Management Tab */}
        {activeTab === 'cars' && (
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent w-64"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-md"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Car</span>
                </button>
              </div>
            </div>

            {/* Cars Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <div key={car.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
                    {car.popular && (
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Popular
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCar(car)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{car.image}</div>
                      <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                      <p className="text-gray-600">{car.type}</p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-pink-600">${car.price}</span>
                        <span className="text-gray-500">/day</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{car.location}</span>
                        <span className="text-gray-400">•</span>
                        <span>{car.seats} seats</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900 font-medium">{car.rating}</span>
                        <span className="text-gray-500">({car.reviews})</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 pt-2">
                        {car.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="pt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          car.availability === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {car.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Car</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Location</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rating</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredCars.map(car => (
                        <tr key={car.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{car.image}</div>
                              <div>
                                <div className="font-medium text-gray-900">{car.name}</div>
                                {car.popular && (
                                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
                                    Popular
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{car.type}</td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-pink-600">${car.price}/day</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{car.location}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              car.availability === 'Available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {car.availability}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-gray-900">{car.rating}</span>
                              <span className="text-gray-500">({car.reviews})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEditCar(car)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCar(car.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other tabs placeholder */}
        {['bookings', 'users', 'settings'].includes(activeTab) && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">This section is under development. Coming soon!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Car Modal */}
      {showAddModal && <CarModal />}
    </div>
  );
};

export default AdminDashboard;