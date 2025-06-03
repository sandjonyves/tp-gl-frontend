'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const token = Cookies.get('auth-token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData: User) => {
    // Simuler une connexion réussie
    const token = 'fake-jwt-token';
    Cookies.set('auth-token', token, { expires: 7 }); // Expire dans 7 jours
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('auth-token');
    localStorage.removeItem('currentUser');
    setUser(null);
    router.push('/auth/signin');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
} 