'use client';

import React, { useState, useEffect } from 'react';
import { CarsManagement } from '@/components/dashboard/CarsManagement';
import { CarModal } from '@/components/dashboard/CarModal';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Vérifier l'authentification
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  if (!isClient) {
    return null; // ou un composant de chargement
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CarsManagement 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
      <CarModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
} 