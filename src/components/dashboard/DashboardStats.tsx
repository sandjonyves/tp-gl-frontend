import React from 'react';
import { Car, BookOpen, Users, DollarSign } from 'lucide-react';

const stats = [
  { title: 'Total Cars', value: '156', icon: Car, change: '+12%' },
  { title: 'Active Bookings', value: '89', icon: BookOpen, change: '+5%' },
  { title: 'Total Users', value: '2,847', icon: Users, change: '+18%' },
  { title: 'Revenue', value: '$45,678', icon: DollarSign, change: '+23%' }
];

export const DashboardStats = () => {
  return (
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
  );
}; 