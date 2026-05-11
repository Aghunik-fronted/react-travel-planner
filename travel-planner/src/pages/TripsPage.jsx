import React, { useEffect, useState } from 'react';
import TripCard from '../components/TripCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import SearchForm from '../components/SearchForm';
import CountryFilter from '../components/CountryFilter';
import TypeFilter from '../components/TypeFilter';
import SortSelect from '../components/SortSelect'; 
import { LayoutGrid, List } from 'lucide-react';
import ViewToggle from '../components/ViewToggle';

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setLoading(true);
    fetch('/mock/trips.json')
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось загрузить данные');
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setTrips(data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

const filteredTrips = trips.filter((trip) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch = searchQuery === '' ? true : [trip.name, trip.country].some(text => 
        text.toLowerCase().split(' ').some(word => 
        word.startsWith(searchQuery.toLowerCase().trim())
        )
    );

  const matchesCountry = selectedCountry ? trip.country === selectedCountry : true;
  const matchesType = selectedType ? trip.type === selectedType : true;

  return matchesSearch && matchesCountry && matchesType;
});

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'duration') {
      return parseInt(b.duration) - parseInt(a.duration);
    }
    return 0;
  });

  const countries = [...new Set(trips.map((t) => t.country))];
  const types = [...new Set(trips.map((t) => t.type))];

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
          Мир ждет <span className="text-blue-600">тебя</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Открой для себя уникальные уголки планеты с нашими маршрутами
        </p>
      </section>

      {/* Панель фильтров (4 колонки на больших экранах) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50">
        <div className="flex flex-col gap-2">
          <SearchForm value={searchQuery} onChange={setSearchQuery} />
        </div>
        
        <div className="flex flex-col gap-2">
          <CountryFilter value={selectedCountry} onChange={setSelectedCountry} options={countries} />
        </div>

        <div className="flex flex-col gap-2">
          <TypeFilter value={selectedType} onChange={setSelectedType} options={types} />
        </div>

        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {/* Инфо-панель: счетчик и переключатель вида */}
      <div className="flex items-center gap-4 px-2">
        <div className="h-px grow bg-gray-100"></div>
        <p className="text-sm text-gray-400 font-medium italic">
          Найдено вариантов: <span className="text-blue-600 font-bold not-italic">{filteredTrips.length}</span>
        </p>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {/* Список карточек */}
      {sortedTrips.length > 0 ? (
        <div className={
          viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" 
          : "flex flex-col gap-6 max-w-5xl mx-auto w-full"
        }>
          {sortedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="py-20">
          <EmptyState />
        </div>
      )}
    </div>
  );
}

export default TripsPage;