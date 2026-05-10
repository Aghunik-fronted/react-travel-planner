import React from 'react';

function Loader() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500'>
        <div className='relative flex items-center justify-center'>
            <div className='absolute w-16 h-16 border-4 border-blue-50 rounded-full'></div>
            <div className='w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin shadow-lg'></div>
        </div>

        <div className='mt-8 flex flex-col items-center gap-2'>
            <p className='text-xl font-bold text-gray-800 animate-pulse tracking-wide'>
                Подбираем маршруты...
            </p>
            <p className='text-sm text-gray-400 font-medium'>
                Это займет всего секунду
            </p>
        </div>
        <div className='absolute -z-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl'></div>
    </div>
  );
}

export default Loader;