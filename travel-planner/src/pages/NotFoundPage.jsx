import React from 'react';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <p className="text-2xl font-bold text-gray-800">Упс! Страница не найдена</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all">
            Вернуться на главную
        </Link>
    </div>
  )
}

export default NotFoundPage;