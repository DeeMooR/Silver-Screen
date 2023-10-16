import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from './pages/Main';
import MoviePage from './pages/MoviePage';
import Entertainment from './pages/Entertainment';
import Afisha from './pages/Afisha';
import { getArrDate, setTodayDateStore } from './helpers';
import VisaPage from './pages/VisaPage';
import NewsPage from './pages/NewsPage';
import SignInUp from './pages/SignInUp';
import Success from './pages/Success';
import ActivateUser from './components/ActivateUser';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchDate = useSelector(({ search }) => search.date);
    if (searchDate === '') setTodayDateStore(getArrDate()[0], dispatch);
    return (
        <>
            <Routes>
                <Route path='/sign-in' element={<SignInUp page='Sign In' />} />
                <Route path='/sign-up' element={<SignInUp page='Sign Up' />} />
                <Route path='/success' element={<Success />} />
                <Route path='/activate/:uid/:token' element={<ActivateUser />} />
                <Route path='/' element={<Main />} />
                <Route path='/afisha' element={<Afisha />} />
                <Route path='/afisha/:id' element={<MoviePage />} />
                <Route path='/entertainment' element={<Entertainment />} />
                <Route path='/news' element={<NewsPage />} />
                <Route path='/visa' element={<VisaPage />} />
                <Route path='*' element={<Navigate to='/afisha'/>} />
            </Routes>
            {/* {location.pathname === '/' && <Navigate to='/afisha' />} */}
        </>
    );
}

export default App;
