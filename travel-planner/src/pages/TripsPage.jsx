import React, { useEffect, useState } from 'react';

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
  
  return (
    <div>
      
    </div>
  );
}

export default TripsPage;