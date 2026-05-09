import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

function TripCard({ trip }) {
  const {favorites, dispatch} = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === trip.id);

  return (
    <div className='group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full'>
        <div className='relative h-64 overflow-hidden'>
            <img 
                src={trip.image}
                alt={trip.name}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm'>
                <Star size={14} className='fill-yellow-400 text-yellow-400' />
                <span className='text-sm font-bold text-gray-800'>{trip.rating}</span>
            </div>
            <FavoriteButton trip={trip} className='absolute top-4 right-4 z-10 cursor-pointer' />
        </div>

        <div className='p-6 flex flex-col grow'>
            <div className='flex justify-between items-start mb-2'>
                <div>
                    <p className='text-blue-600 text-xs font-bold uppercase tracking-wider mb-1'>{trip.country}</p>
                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>{trip.name}</h3>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-3 text-gray-500 text-sm'>
                <div className='flex items-center gap-1'>
                    <Clock size={16}/>
                    <span>{trip.duration}</span>
                </div>
                <div className='px-2 py-0.5 bg-gray-100 rounded text-xs'>{trip.type}</div>
            </div>

            <div className='mt-auto pt-6 flex items-center justify-between border-t border-gray-50'>
                <div>
                    <span className='text-2xl font-black text-gray-900'>${trip.price}</span>
                    <span className='text-gray-400 text-sm'>/чел</span>
                </div>
                <Link 
                    to={`/trips/${trip.id}`}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95'
                >
                    Детали
                </Link>
            </div>
        </div>
    </div>
  );
}

export default TripCard;