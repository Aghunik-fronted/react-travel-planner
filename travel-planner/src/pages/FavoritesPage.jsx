import React from 'react';
import TripCard from '../components/TripCard';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { Trash2 } from 'lucide-react';

function FavoritesPage() {
  const { favorites, dispatch } = useFavorites();

    const handleClear = () => {
        const confirmClear = window.confirm("Вы уверены, что хотите очистить весь список избранного?");
        if (confirmClear) {
            dispatch({ type: 'CLEAR_ALL' });
        }
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <section className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
            <div className="space-y-2">
                <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                    Моё <span className="text-red-500">избранное</span>
                </h1>
                <p className="text-gray-500 text-lg">
                    Места, которые покорили ваше сердце
                </p>
            </div>

            {favorites.length > 0 && (
                <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all active:scale-95 group cursor-pointer"
                >
                    <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                        Очистить список
                </button>
            )}
        </section>

        {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {favorites.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <EmptyState />
                <p className="text-gray-400">Пока здесь ничего нет. Время что-нибудь добавить!</p>
            </div>
        )}
    </div>
  );
}

export default FavoritesPage;