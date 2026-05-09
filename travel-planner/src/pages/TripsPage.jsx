import React, { useEffect, useState } from 'react';
import TripCard from '../components/TripCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import SearchForm from '../components/SearchForm';
import CountryFilter from '../components/CountryFilter';
import TypeFilter from '../components/TypeFilter';

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoadind] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetch('/mock/trips.json')
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось загрузить данные');
        return res.json();
      })
      .then((data) => setTrips(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadind(false));
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry ? trip.country === selectedCountry : true;
    const matchesType = selectedType ? trip.type === selectedType : true;
    return matchesSearch && matchesCountry && matchesType;
  });

  const countries = [...new Set(trips.map((t) => t.country))];
  const types = [...new Set(trips.map((t) => t.type))];

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Секция заголовка: Добавили градиент и центрирование */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
          Мир ждет <span className="text-blue-600">тебя</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Открой для себя уникальные уголки планеты с нашими маршрутами
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Поиск</label>
          <SearchForm value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Страна</label>
          <CountryFilter
            value={selectedCountry} 
            onChange={setSelectedCountry}
            options={countries}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Категория</label>
          <TypeFilter 
            value={selectedType}
            onChange={setSelectedType}
            options={types}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 px-2">
        <div className="h-px grow bg-gray-100"></div>
        <p className="text-sm text-gray-400 font-medium italic">
          Найдено вариантов: <span className="text-blue-600 font-bold not-italic">{filteredTrips.length}</span>
        </p>
        <div className="h-px grow bg-gray-100"></div>
      </div>

      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
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