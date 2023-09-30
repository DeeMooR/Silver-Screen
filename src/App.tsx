import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Afisha from './pages/Afisha';

function App() {
    const location = useLocation();
  return (
    <>
        <Routes>
            <Route path='/afisha' element={<Afisha />} />
            <Route path='*' element={<Navigate to='/afisha'/>} />
        </Routes>
        {location.pathname === '/' && <Navigate to='/afisha' />}
    </>
  );
}

export default App;
