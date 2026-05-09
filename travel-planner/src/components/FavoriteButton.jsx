import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

function FavoriteButton({ trip, className = "" }) {
    const { favorites, dispatch } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.id == trip.id);

    const toggleFavorite = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        dispatch({ type: 'TOGGLE_FAVORITE', payload: trip });
    };
  return (
    <button 
        onClick={toggleFavorite}
        className={`p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:scale-110 active:scale-90 transition-all group ${className}`}
        aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    >
        <Heart 
            size={20} 
            className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-gray-600"}`} 
        />
    </button>
  );
}

export default FavoriteButton;