import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react';

function SortSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortLabels = {
    'default': 'По умолчанию',
    'price-asc': 'Сначала дешевле',
    'price-desc': 'Сначала дороже',
    'rating': 'Высокий рейтинг',
    'duration': 'Длительные'
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-xs font-bold text-gray-400 ml-2 uppercase tracking-widest text-center md:text-left">
        Сортировка
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-3xl text-left text-gray-700 flex justify-between items-center transition-all hover:bg-white hover:shadow-lg focus:ring-4 focus:ring-blue-100 outline-none"
        >
          <div className="flex items-center gap-2 truncate">
            <ArrowUpDown size={14} className="text-gray-400" />
            <span className="truncate">{sortLabels[value] || "По умолчанию"}</span>
          </div>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-1">
            {Object.entries(sortLabels).map(([key, label]) => (
              <div
                key={key}
                className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center text-gray-700 font-medium transition-colors"
                onClick={() => { onChange(key); setIsOpen(false); }}
              >
                {label}
                {value === key && <Check size={16} className="text-blue-600" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SortSelect;