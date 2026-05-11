import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft, Star, Clock, MapPin } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import Loader from '../components/Loader';
import FavoriteButton from '../components/FavoriteButton';

function TripPage() {
  const  { id } = useParams();
  const navigate = useNavigate();
  const { favorites, dispatch } = useFavorites();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(' /react-travel-planner/mock/trips.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => t.id === Number(id));
        setTrip(found);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!trip) return <div className="text-center py-20 text-2xl">Поездка не найдена</div>;

  const isFavorite = favorites.some(fav => fav.id === trip.id);

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
        <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group'
        >
            <ChevronLeft size={20} className='group-hover:-translate-x-1 transition-transform'/>
            <span className='cursor-pointer'>Назад к списку</span>
        </button>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl'>
                <img src={trip.image} alt={trip.name} className='w-full h-full object-cover' />
                <FavoriteButton trip={trip} className='absolute top-6 right-6 scale-125 cursor-pointer' />
            </div>

            <div className='space-y-8'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm'>
                        <MapPin size={16} />
                        {trip.country}
                    </div>
                    <h1 className='text-5xl font-black text-gray-900 leading-tight'>{trip.name}</h1>
                    <div className='flex items-center gap-6'>
                        <div className='flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full'>
                            <Star size={18} className='fill-yellow-400 text-yellow-400'/>
                            <span className='font-bold text-yellow-700'>{trip.rating}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <Clock size={18} />
                            <span>{trip.duration}</span>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-50 p-6 rounded-3xl border border-gray-100'>
                    <h3 className='font-bold text-gray-900 mb-2'>Об отдыхе</h3>
                    <p className='text-gray-600 leading-relaxed text-lg'>{trip.description}</p>
                </div>
                <div className='pt-8 border-t border-gray-100 flex items-center justify-between'>
                    <div>
                        <p className='text-gray-400 text-sm font-medium uppercase tracking-wider'>Итоговая цена</p>
                        <p className='text-4xl font-black text-blue-600'>${trip.price}</p>
                    </div>
                    <button className='bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 cursor-pointer'>
                        Забронировать
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default TripPage;