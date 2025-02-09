import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader1 from './utilities/Loader1';
import { getUser } from './redux/thunks/userThunk';
import { ToastContainer } from "react-toastify";
import { RoleRoutes, UserRoutes } from './components/auth/ProtectedRoute';
// import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((s) => s.auth);
  useEffect( () => {
    console.log(user)
  },[user])
  useEffect(() => {
    dispatch(getUser())
  } , []);
  const {loading}  = useSelector((s) => s.auth);
  const LandingPage = lazy(() => import('./views/app/Main'));
  const LoginPage = lazy(() => import('./views/app/Login'));
  const RegisterPage = lazy(() => import('./views/app/SignUp'));

  // User Routes
  const UserLayout = lazy(() => import('./views/users/components/Layout'));
  const UserDashboard = lazy(() => import('./views/users/Dashboard'));

  return (
    
      loading ? <><Loader1/></> : <Suspense fallback={<Loader1/>} >
      <BrowserRouter >
        <Routes>
         <Route element={<UserRoutes/>}>
            <Route path='/' element={<><LandingPage/></>}  />
            <Route path='/login' element={<><LoginPage/></>}  />
            <Route path='/signup' element={<><RegisterPage/></>}  />
          </Route>
            {/* User Routes */}
          <Route path='/user' element={<RoleRoutes requiredRole={"user"}/>}>
            <Route index element={<UserLayout ><UserDashboard/></UserLayout>} />
            <Route path='my-donations' element={<UserLayout><>My Donations</></UserLayout>}/>
            <Route path='my-requests' element={<UserLayout><>My Donations</></UserLayout>}/>
            <Route path='my-tickets' element={<UserLayout><>My Donations</></UserLayout>}/>
            <Route path='my-profile' element={<UserLayout><>My Donations</></UserLayout>}/>
          </Route>
            {/* Admin Routes */}

            {/* Member Routes */}
        </Routes>
      </BrowserRouter>
      <ToastContainer  position='bottom-right'   />
    </Suspense>
    
  );
}

export default App;
