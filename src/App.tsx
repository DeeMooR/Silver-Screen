import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from './pages/Main';
import MoviePage from './pages/MoviePage';
import Entertainment from './pages/Entertainment';
import Afisha from './pages/Afisha';
import { getArrDate, setTodayDateStore } from './helpers';
import VisaPage from './pages/VisaPage';
import NewsPage from './pages/NewsPage';
import SignInUp from './pages/SignInUp';
import SuccessOrNot from './pages/SuccessOrNot';
import ActivateUser from './components/ActivateUser';
import { decodeJwt, expToMinutes, updateAccessToken } from './updateToken';
import CheckEmail from './pages/CheckEmail/CheckEmail';
import ResetPassword from './pages/ResetPassword';
import NewPasswordSuccess from './pages/NewPasswordSuccess';
import NewPassword from './pages/NewPassword/NewPassword';
import Account from './pages/Account';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('access');

    if (token) {
        fetch("https://studapi.teachmeskills.by/auth/users/me/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        .then((response) => response.json())
        .then((userData) => {
            console.log(userData)
            dispatch({ type: "SET_USER", payload: userData });
        });
    }

    const startTokenRefreshTimer = () => {
        if (token) {
            const expirationTimestamp = decodeJwt(token).payload.exp;
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTimestamp*1000 - currentTime;
    
            if(timeUntilExpiration > 20000) {
                setInterval(updateAccessToken, timeUntilExpiration - 20000);
            } else {
                localStorage.removeItem('access');
            }
        }
    };

    if (token) {
        const JWTData = decodeJwt(token);
        console.log(JWTData);
        let expTimestamp = JWTData.payload.exp;
        let remainingMinutes = expToMinutes(expTimestamp)
        console.log('remaining:' + remainingMinutes);
    }

    useEffect(() => {
        window.addEventListener('storage', (event) => {
            console.log(event);
            if (event.key === 'access' && event.newValue === null) {
                navigate("/sign-in");
            }
        });
        startTokenRefreshTimer();
    }, []);

    const searchDate = useSelector(({ search }) => search.date);
    if (searchDate === '') setTodayDateStore(getArrDate()[0], dispatch);
    return (
        <>
            <Routes>
                <Route path='/sign-in' element={<SignInUp page='Sign In' />} />
                <Route path='/sign-up' element={<SignInUp page='Sign Up' />} />
                <Route path='/success' element={<SuccessOrNot success />} />
                <Route path='/no-success' element={<SuccessOrNot success={false} />} />
                <Route path='/sign-up/check-email' element={<CheckEmail messege='register' />} />
                <Route path='/activate/:uid/:token' element={<ActivateUser />} />

                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/reset-password/check-email' element={<CheckEmail messege='reset password' />} />
                <Route path='/password/reset/confirm/:uid/:token' element={<NewPassword />} />
                <Route path='/new-password/success' element={<NewPasswordSuccess />} />

                <Route path='/' element={<Main />} />
                <Route path='/afisha' element={<Afisha />} />
                <Route path='/afisha/:id' element={<MoviePage />} />
                <Route path='/entertainment' element={<Entertainment />} />
                <Route path='/news' element={<NewsPage />} />
                <Route path='/visa' element={<VisaPage />} />
                <Route path='/account' element={<Account />} />
                <Route path='*' element={<Navigate to='/'/>} />
            </Routes>
        </>
    );
}

export default App;