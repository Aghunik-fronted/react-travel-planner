import { FavoritesProvider } from './context/FavoritesContext'; // Добавьте это!
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TripsPage from './pages/TripsPage';
import TripPage from './pages/TripPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TripsPage />} />
            <Route path="trips/:id" element={<TripPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
