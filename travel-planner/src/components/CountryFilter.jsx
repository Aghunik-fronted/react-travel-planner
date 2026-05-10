import React from 'react';
import { ChevronDown } from 'lucide-react';

function CountryFilter({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer appearance-none pr-10 transition-all text-gray-700"
      >
        <option value="">Все страны</option>
        {options.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <ChevronDown 
        size={18} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
      />
    </div>
  );
}

export default CountryFilter;