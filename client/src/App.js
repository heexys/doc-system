import {BrowserRouter, Routes ,Route} from 'react-router-dom'

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

import { useSelector } from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute"
import Spiner from './components/Spiner';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Doctors from './pages/admin/Doctors';
import Users from './pages/admin/Users';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spiner /> :
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/apply-doctor'
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/admin/users'
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/admin/doctors'
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/doctor/profile/:id'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/doctor/book-appointment/:doctorId'
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/notification'
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
      }
      </BrowserRouter>
    </>
  );
}

export default App;
