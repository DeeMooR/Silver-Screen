import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from './pages/Main';
import MoviePage from './pages/MoviePage';
import Afisha from './pages/Afisha';
import { getArrDate, setTodayDateStore } from './helpers';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchDate = useSelector(({ search }) => search.date);
    if (searchDate === '') setTodayDateStore(getArrDate()[0], dispatch);
    return (
        <>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/afisha' element={<Afisha />} />
                <Route path='/afisha/:id' element={<MoviePage />} />
                <Route path='*' element={<Navigate to='/afisha'/>} />
            </Routes>
            {/* {location.pathname === '/' && <Navigate to='/afisha' />} */}
        </>
    );
}

export default App;
