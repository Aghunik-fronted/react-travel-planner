import React from 'react';
import { Search } from 'lucide-react';

function SearchForm({ value, onChange }) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className="text-xs font-bold text-gray-400 ml-2 uppercase tracking-widest">
        Поиск
      </label>
      
      <div className='relative group'>
          <Search 
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors' 
              size={20} 
          />
          <input 
              type="text" 
              placeholder='Название или страна...'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-3xl text-gray-700 outline-none transition-all duration-300
                         hover:bg-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50
                         focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
          />
      </div>
    </div>
  );
}

export default SearchForm;