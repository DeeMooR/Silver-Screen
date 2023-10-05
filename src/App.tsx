import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MoviePage from './pages/MoviePage';
import Afisha from './pages/Afisha';
import { getArrDate } from './helpers';

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
