import React from 'react';
import { ChevronDown } from 'lucide-react';

function SortSelect({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-gray-400 ml-2 uppercase tracking-wider">
        Сортировка
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer appearance-none pr-10 transition-all text-gray-700 shadow-sm hover:border-gray-300"
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="rating">Высокий рейтинг</option>
          <option value="duration">Длительные</option>
        </select>
        <ChevronDown 
          size={18} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>
    </div>
  );
}

export default SortSelect;