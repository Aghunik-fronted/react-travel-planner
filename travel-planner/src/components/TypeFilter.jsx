import React from 'react';

function TypeFilter({ value, onChange, options }) {
  return (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer'
    >
        <option value="">Любой тип отдыха</option>
        {options.map((type) => (
            <option key={type} value={type}>
                {type}
            </option>
        ))}
    </select>
  );
}

export default TypeFilter;