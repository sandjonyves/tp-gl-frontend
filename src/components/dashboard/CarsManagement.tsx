import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Filter, Grid, List, Star, MapPin } from 'lucide-react';
import { Button, Input, Table, Card, Badge } from '@/components/ui';
import { CarModal } from './CarModal';
import { vehicleService, Vehicle } from '@/services/vehicle.service';

interface CarsManagementProps {
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
}

export const CarsManagement = ({ showAddModal, setShowAddModal }: CarsManagementProps) => {
  const [viewMode, setViewMode] = useState('grid');
  const [editingCar, setEditingCar] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const vehicles = await vehicleService.getAllVehicles();
      console.log('Loaded vehicles:', vehicles); // Debug log
      setCars(vehicles);
      setError(null);
    } catch (err) {
      console.error('Error loading vehicles:', err);
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCar = (car: Vehicle) => {
    setEditingCar(car);
    setShowAddModal(true);
  };

  const handleDeleteCar = async (registrationNumber: number) => {
    try {
      await vehicleService.deleteVehicle(registrationNumber);
      setCars(cars.filter(car => car.registrationNumber !== registrationNumber));
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
  };

  const handleAddCar = async (carData: Omit<Vehicle, 'registrationNumber'>) => {
    try {
      const newCar = await vehicleService.createVehicle(carData);
      console.log('Added new car:', newCar); // Debug log
      setCars([...cars, newCar]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding vehicle:', err);
    }
  };

  const handleUpdateCar = async (registrationNumber: number, carData: Partial<Vehicle>) => {
    try {
      const updatedCar = await vehicleService.updateVehicle(registrationNumber, carData);
      console.log('Updated car:', updatedCar); // Debug log
      setCars(cars.map(car => car.registrationNumber === registrationNumber ? updatedCar : car));
      setShowAddModal(false);
      setEditingCar(null);
    } catch (err) {
      console.error('Error updating vehicle:', err);
    }
  };

  const filteredCars = cars.filter(car => 
    String(car.registrationNumber).toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Vehicle',
      accessor: (car: Vehicle) => (
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🚗</div>
          <div>
            <div className="font-medium text-gray-900">{car.make} {car.model}</div>
            <div className="text-sm text-gray-500">{car.registrationNumber}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Year', 
      accessor: (car: Vehicle) => car.year 
    },
    {
      header: 'Price',
      accessor: (car: Vehicle) => (
        <span className="font-bold text-pink-600">${car.rentalPrice}/day</span>
      )
    },
    {
      header: 'Actions',
      accessor: (car: Vehicle) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Edit2}
            onClick={() => handleEditCar(car)}
            className="hover:text-blue-600 hover:bg-blue-50"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => handleDeleteCar(car.registrationNumber)}
            className="hover:text-red-600 hover:bg-red-50"
          />
        </div>
      )
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Input
            icon={Search}
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button
            variant="outline"
            icon={Filter}
            onClick={() => {}}
          >
            Filters
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Button
              variant="ghost"
              size="sm"
              icon={Grid}
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={List}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
            />
          </div>
          
          <Button
            icon={Plus}
            onClick={() => {
              setEditingCar(null);
              setShowAddModal(true);
            }}
          >
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Debug info */}
      <div className="text-sm text-gray-500">
        Total vehicles: {cars.length}, Filtered: {filteredCars.length}
      </div>

      {/* Vehicles grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <Card key={`car-${car.registrationNumber}`} hover className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🚗</div>
                <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
                <p className="text-gray-600">{car.registrationNumber}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">${car.rentalPrice}</span>
                  <span className="text-gray-500">/day</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>Year: {car.year}</span>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={() => handleEditCar(car)}
                    className="hover:text-blue-600 hover:bg-blue-50"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDeleteCar(car.registrationNumber)}
                    className="hover:text-red-600 hover:bg-red-50"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          data={filteredCars}
          onRowClick={(car) => handleEditCar(car)}
        />
      )}

      {/* Add/Edit Vehicle Modal */}
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
}; 