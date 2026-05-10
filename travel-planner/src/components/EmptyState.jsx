import React from 'react';

function EmptyState() {
  return (
    <div className='text-center py-10'>
        <div className='text-6xl mb-4'>🏜️</div>
        <h3 className='text-xl font-bold text-gray-800'>Ничего не найдено</h3>
        <p className='text-gray-500'>Попробуйте изменить параметры поиска</p>
    </div>
  );
}

export default EmptyState;