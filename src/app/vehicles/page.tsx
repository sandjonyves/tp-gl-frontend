'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star, Heart, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    dateFrom: '',
    dateTo: '',
    priceRange: [0, 500],
    carType: '',
    transmission: '',
    fuelType: '',
    passengers: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteCars, setFavoriteCars] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('popular');

  // Sample car data
  const [cars] = useState([
    {
      id: 1,
      name: 'Ocean Breeze',
      type: 'Convertible',
      image: '🏎️',
      price: 89,
      rating: 4.9,
      reviews: 156,
      location: 'Miami Beach',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      passengers: 2,
      features: ['GPS', 'Bluetooth', 'AC'],
      available: true,
      popular: true
    },
    {
      id: 2,
      name: 'City Explorer',
      type: 'Compact SUV',
      image: '🚙',
      price: 65,
      rating: 4.7,
      reviews: 203,
      location: 'Downtown',
      transmission: 'Automatic',
      fuel: 'Hybrid',
      passengers: 5,
      features: ['GPS', 'Backup Camera', 'Apple CarPlay'],
      available: true,
      popular: false
    },
    {
      id: 3,
      name: 'Luxury Cruiser',
      type: 'Sedan',
      image: '🚗',
      price: 120,
      rating: 4.8,
      reviews: 89,
      location: 'Airport',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      passengers: 4,
      features: ['Leather Seats', 'Premium Sound', 'GPS'],
      available: true,
      popular: true
    },
    {
      id: 4,
      name: 'Adventure Beast',
      type: 'SUV',
      image: '🚜',
      price: 95,
      rating: 4.6,
      reviews: 134,
      location: 'Mountain View',
      transmission: 'Manual',
      fuel: 'Diesel',
      passengers: 7,
      features: ['4WD', 'Roof Rack', 'GPS'],
      available: false,
      popular: false
    },
    {
      id: 5,
      name: 'Eco Friendly',
      type: 'Electric',
      image: '⚡',
      price: 75,
      rating: 4.9,
      reviews: 267,
      location: 'Tech District',
      transmission: 'Automatic',
      fuel: 'Electric',
      passengers: 4,
      features: ['Fast Charging', 'Autopilot', 'Premium Interior'],
      available: true,
      popular: true
    },
    {
      id: 6,
      name: 'Family Van',
      type: 'Minivan',
      image: '🚐',
      price: 85,
      rating: 4.5,
      reviews: 112,
      location: 'Suburbs',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      passengers: 8,
      features: ['Captain Chairs', 'Entertainment System', 'GPS'],
      available: true,
      popular: false
    }
  ]);

  const [filteredCars, setFilteredCars] = useState(cars);

  // Filter cars based on search and filters
  useEffect(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !selectedFilters.location || car.location.toLowerCase().includes(selectedFilters.location.toLowerCase());
      const matchesCarType = !selectedFilters.carType || car.type === selectedFilters.carType;
      const matchesTransmission = !selectedFilters.transmission || car.transmission === selectedFilters.transmission;
      const matchesFuel = !selectedFilters.fuelType || car.fuel === selectedFilters.fuelType;
      const matchesPassengers = !selectedFilters.passengers || car.passengers >= parseInt(selectedFilters.passengers);
      const matchesPrice = car.price >= selectedFilters.priceRange[0] && car.price <= selectedFilters.priceRange[1];

      return matchesSearch && matchesLocation && matchesCarType && matchesTransmission && matchesFuel && matchesPassengers && matchesPrice;
    });

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    setFilteredCars(filtered);
  }, [searchQuery, selectedFilters, sortBy, cars]);

  const toggleFavorite = (carId: number) => {
    const newFavorites = new Set(favoriteCars);
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId);
    } else {
      newFavorites.add(carId);
    }
    setFavoriteCars(newFavorites);
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: '',
      dateFrom: '',
      dateTo: '',
      priceRange: [0, 500],
      carType: '',
      transmission: '',
      fuelType: '',
      passengers: ''
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f8f4ff 0%, #e8f5ff 100%)'
    }}>
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-2xl animate-bounce opacity-10">✨</div>
      <div className="absolute top-40 right-20 text-2xl animate-pulse opacity-10">🚗</div>
      <div className="absolute bottom-20 left-20 text-2xl animate-bounce opacity-10 delay-1000">💎</div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚗</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Propelize
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">My Bookings</a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Favorites</a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Support</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-pink-500 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-3 py-2">
                <User className="w-4 h-4 text-pink-600" />
                <span className="text-sm text-pink-600 font-medium">{user?.name}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-600 text-sm mb-4">
            ✨ Welcome back, {user?.name}!
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Find Your Perfect Ride
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing cars for every journey. From city cruisers to adventure vehicles, we've got the perfect ride waiting for you.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by car name, type, or location..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedFilters.location}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors appearance-none bg-white"
                >
                  <option value="">Any Location</option>
                  <option value="Miami Beach">Miami Beach</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Airport">Airport</option>
                  <option value="Mountain View">Mountain View</option>
                  <option value="Tech District">Tech District</option>
                  <option value="Suburbs">Suburbs</option>
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={selectedFilters.dateFrom}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all ${
                  showFilters 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'border border-gray-300 text-gray-600 hover:border-pink-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
                  <select
                    value={selectedFilters.carType}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, carType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Any Type</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Compact SUV">Compact SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Electric">Electric</option>
                    <option value="Minivan">Minivan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select
                    value={selectedFilters.transmission}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, transmission: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Any</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={selectedFilters.fuelType}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, fuelType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Any</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Passengers</label>
                  <select
                    value={selectedFilters.passengers}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, passengers: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Any</option>
                    <option value="2">2+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                    <option value="7">7+</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Price Range: ${selectedFilters.priceRange[0]} - ${selectedFilters.priceRange[1]}</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={selectedFilters.priceRange[1]}
                    onChange={(e) => setSelectedFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                    }))}
                    className="w-32"
                  />
                </div>
                <button
                  onClick={clearFilters}
                  className="text-pink-500 hover:text-pink-600 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Available Cars ({filteredCars.length})
            </h2>
            <p className="text-gray-600">Find the perfect car for your next adventure</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className={`bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Car Image/Icon */}
              <div className={`${
                viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'
              } bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center relative`}>
                <div className="text-6xl">{car.image}</div>
                
                {car.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}
                
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favoriteCars.has(car.id) 
                        ? 'fill-pink-500 text-pink-500' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>

                {!car.available && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Not Available
                    </span>
                  </div>
                )}
              </div>

              {/* Car Details */}
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h3>
                    <p className="text-gray-600 text-sm">{car.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      ${car.price}
                    </div>
                    <div className="text-gray-500 text-sm">/day</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{car.passengers} seats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{car.rating} ({car.reviews})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div>Transmission: {car.transmission}</div>
                  <div>Fuel: {car.fuel}</div>
                </div>

                <button
                  disabled={!car.available}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    car.available
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {car.available ? 'Book Now ✨' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No cars found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-white/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-gray-600">Car Models</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                99%
              </div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 