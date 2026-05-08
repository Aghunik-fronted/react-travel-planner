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
    <div className='space-y-8'>
        <section className='text-center space-y-4'>
            <h1 className='text-4xl font-extrabold text-gray-900'>Найдите свое идеальное путешествие</h1>
            <p className='text-gray-500'>Лучшие предложения по всему миру</p>
        </section>
        <div>
            <SearchForm value={searchQuery} onChange={setSearchQuery} />
            <CountryFilter
                value={selectedCountry} 
                onChange={setSelectedCountry}
                options={countries}
            />
            <TypeFilter 
                value={selectedType}
                onChange={setSelectedType}
                options={types}
            />
        </div>
        <div className='flex justify-between items-center'>
            <p className='text-gray-600 font-medium'>
                Найдено: <span className='text-blue-600'>{filteredTrips.length}</span>
            </p>
        </div>
        {filteredTrips.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {filteredTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        ) : (
            <EmptyState />
        )}
    </div>
  );
}

export default TripsPage;