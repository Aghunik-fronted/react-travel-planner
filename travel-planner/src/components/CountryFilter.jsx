import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

function CountryFilter({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            Страна
        </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-3xl text-left text-gray-700 flex justify-between items-center transition-all hover:bg-white hover:shadow-lg focus:ring-4 focus:ring-blue-100"
        >
          <span className="truncate">{value || "Все страны"}</span>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 py-2">
            <div 
              className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center text-gray-600 transition-colors"
              onClick={() => { onChange(""); setIsOpen(false); }}
            >
              Все страны
              {!value && <Check size={16} className="text-blue-600" />}
            </div>
            
            {options.map((opt) => (
              <div
                key={opt}
                className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center text-gray-700 font-medium transition-colors"
                onClick={() => { onChange(opt); setIsOpen(false); }}
              >
                {opt}
                {value === opt && <Check size={16} className="text-blue-600" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryFilter;