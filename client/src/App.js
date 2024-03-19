import {BrowserRouter, Routes ,Route} from 'react-router-dom'

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

import { useSelector } from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute"
import Spiner from './components/Spiner';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';

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
