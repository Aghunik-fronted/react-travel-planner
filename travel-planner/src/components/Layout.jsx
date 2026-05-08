import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useFavorites } from '../context/FavoritesContext';

function Layout() {
    const { favorites } = useFavorites();

  return (
    <div className='min-h-screen bg-gray-50'>
        <Header />
        <main className='container mx-auto px-4 py-8'>
            <Outlet />
        </main>
    </div>
  );
}

export default Layout;