import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Unauthorized from '~/pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import UserList from './pages/UserList';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route element={<Home />}>
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
            <Route path='register' element={<Register />} />
            <Route
              path='user-list'
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
