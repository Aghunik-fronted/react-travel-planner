import React from 'react';

function CountryFilter({ value, onChange, options }) {
  return (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-4 py-2 border border-gray-200 rounded-xl focus::ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer'
    >
        <option value=''>Все страны</option>
        {options.map((country) => (
            <option key={country} value={country}>
                {country}
            </option>
        ))}
    </select>
  );
}

export default CountryFilter;