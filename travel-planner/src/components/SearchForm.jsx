import React from 'react';
import { Search } from 'lucide-react';


function SearchForm({ value, onChange }) {
  return (
    <div className='relative'>
        <Search className='absolute left-3 top-1/4 text-gray-400 size={18}'/>
        <input 
            type="text" 
            placeholder='Поиск по названию...'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
        />
    </div>
  );
}

export default SearchForm;