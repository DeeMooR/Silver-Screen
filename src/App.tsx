import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { decodeJwt, expToMinutes, startTokenRefreshTimer } from './helpers/helperToken';
import { getArrDate, setDateStore } from './helpers/helper';
import { GET_USER } from './actions/actions';

import Admin from './pages/Admin';
import Account from './pages/Account';
import SignInUp from './pages/SignInUp';
import Main from './pages/Main';
import Afisha from './pages/Afisha';
import MoviePage from './pages/MoviePage';
import BuyTicketPage from './pages/BuyTicketPage';
import PresentCard from './pages/PresentCard';
import Entertainment from './pages/Entertainment';
import VisaPage from './pages/VisaPage';
import NewsPage from './pages/NewsPage';
import Page404 from './pages/Page404/Page404';
import ActivateUser from './components/ActivateUser';
import CheckEmail from './pages/CheckEmail/CheckEmail';
import SuccessOrNot from './pages/SuccessOrNot';
import ResetPassword from './pages/ResetPassword';
import NewPasswordSuccess from './pages/NewPasswordSuccess';
import NewPassword from './pages/NewPassword/NewPassword';

function App() {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const searchDate = useSelector(({store}) => store.search.date);

    const token = localStorage.getItem('access');
    const isAdmin = localStorage.getItem('isAdmin') ? true : false;
    if (searchDate === '') setDateStore(getArrDate()[0], dispatch);

    useEffect(() => {
        if (token) dispatch(GET_USER(token));
    }, [token]);

    // если истекло время переход на страницу 'Sign-in'
    useEffect(() => {
        window.addEventListener('storage', (event) => {
            if (event.key === 'access' && event.newValue === null) {
                navigate("/sign-in");
            }
        });
        if (token) startTokenRefreshTimer(token);
    }, []);

    // оставшееся время действия токена
    if (token) {
        const JWTData = decodeJwt(token);
        let expTimestamp = JWTData.payload.exp;
        let remainingMinutes = expToMinutes(expTimestamp)
        console.log('remaining:' + remainingMinutes);
    }
    
    return (
        <>
            <Routes>
                {isAdmin &&
                    <Route path='/admin' element={<Admin />} />
                }
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
                <Route path='/buy-ticket/:id/:date/:seance' element={<BuyTicketPage />} />
                <Route path='/entertainment' element={<Entertainment />} />
                <Route path='/news' element={<NewsPage />} />
                <Route path='/visa' element={<VisaPage />} />
                <Route path='/account' element={<Account />} />
                <Route path='/presentcard' element={<PresentCard />} />

                <Route path='/page404' element={<Page404 />} />
                <Route path='*' element={<Navigate to='/page404'/>} />
            </Routes>
        </>
    );
}

export default App;