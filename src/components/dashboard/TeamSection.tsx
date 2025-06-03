import React from 'react';
import { Users } from 'lucide-react';

export const TeamSection = () => {
  const teamMembers = [
    { name: 'Jean Dupont', role: 'Développeur frontend' },
    { name: 'Fatou Ndiaye', role: 'Développeuse backend' },
    { name: 'Marc Ngassa', role: 'Intégrateur' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Notre équipe
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
            <p className="font-medium text-gray-900">{member.name}</p>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 