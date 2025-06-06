'use client';

import React, { useState, useEffect } from 'react';
import { CarsManagement } from '@/components/dashboard/CarsManagement';
import { CarModal } from '@/components/dashboard/CarModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Vehicle } from '@/services/vehicle.service';
import { vehicleService } from '@/services/vehicle.service';

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Vehicle | null>(null);
  const router = useRouter();
  const { user, loading, checkRoleAndRedirect } = useAuth();

  useEffect(() => {
    checkRoleAndRedirect();
  }, [checkRoleAndRedirect]);

  const handleAddCar = async (carData: Omit<Vehicle, 'registrationNumber'>) => {
    try {
      await vehicleService.createVehicle(carData);
      setShowAddModal(false);
      setEditingCar(null);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleUpdateCar = async (registrationNumber: number, carData: Partial<Vehicle>) => {
    try {
      await vehicleService.updateVehicle(registrationNumber, carData);
      setShowAddModal(false);
      setEditingCar(null);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleEditCar = (car: Vehicle) => {
    setEditingCar(car);
    setShowAddModal(true);
  };

  const handleAddClick = () => {
    setEditingCar(null);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user()) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CarsManagement 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        onEditCar={handleEditCar}
        onAddClick={handleAddClick}
      />
      {showAddModal && (
        <CarModal
          editingCar={editingCar}
          setEditingCar={setEditingCar}
          setShowAddModal={setShowAddModal}
          onAdd={handleAddCar}
          onUpdate={handleUpdateCar}
        />
      )}
    </div>
  );
} 