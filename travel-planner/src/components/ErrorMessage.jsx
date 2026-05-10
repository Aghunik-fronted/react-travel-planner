import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

function ErrorMessage({ message }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] p-6 text-center'>
        <div className='bg-red-50 p-4 rounded-full mb-4'>
            <AlertCircle size={48} className='text-red-500'/>
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Что-то пошло не так</h2>
        <p className='text-gray-200 max-w-sm mb-8'>
            {message || "Не удалось загрузить данные. Пожалуйста, проверьте интернет-соединение или попробуйте позже."}
        </p>
        <button 
            onClick={() => window.location.reload()}
            className='flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 cursor-pointer' 
        >
            <RefreshCcw size={18} />
            Повторить попытку
        </button>
    </div>
  );
}

export default ErrorMessage;