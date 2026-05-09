import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    const { favorites } = useFavorites();
  return (
    <header className='bg-white shadow-sm sticky top-0 z-10'>
        <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <Link to="/" className='text-2xl font-bold text-blue-600'>Travel App</Link>
            <div className='flex gap-3'>
                <NavLink
                    to="/"
                    className={({ isActive}) => isActive ? 'text-blue-600 font-medium' : 'hover:text-blue-500'}
                >
                    Главная
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) => `relative ${isActive ? 'text-blue-600 font-medium' : 'hover:text-blue-500'}`}
                >
                    Избранное
                    { favorites.length > 0 && (
                        <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                            {favorites.length}
                        </span>
                    )}
                </NavLink>
            </div>
        </nav>
    </header>
  );
}

export default Header;