import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import Afisha from './pages/Afisha';

function App() {
    const location = useLocation();
  return (
    <>
        <Routes>
            <Route path='/afisha' element={<Afisha />} />
            <Route path='/afisha/:id' element={<MoviePage />} />
            <Route path='*' element={<Navigate to='/afisha'/>} />
        </Routes>
        {location.pathname === '/' && <Navigate to='/afisha' />}
    </>
  );
}

export default App;
