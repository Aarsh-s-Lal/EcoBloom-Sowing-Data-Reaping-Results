import React, { Suspense } from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <Suspense fallback={<>Loading ...</>} >
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<>Home</>}  />
            <Route path='/login' element={<>login</>}  />
            <Route path='/signup' element={<>Signup</>}  />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
