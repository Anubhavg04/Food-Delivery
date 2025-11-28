import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import RestaurantPage from './pages/RestaurantPage.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { AuthContext } from './contexts/AuthContext';
import { ThemeContext } from './contexts/ThemeContext';
import Footer from './components/Footer';

const App: React.FC = () => {
  const auth = useContext(AuthContext)!;
  const theme = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">ZomatoClone</Link>
          <div className="flex items-center">
            <button
              onClick={() => theme?.toggleTheme()}
              aria-label="Toggle theme"
              className="mr-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {theme?.theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <div className="flex items-center gap-4">
              <Link to="/cart" className="text-sm">Cart</Link>
              {auth.user ? (
                <>
                  <span className="mr-2">Hi, {auth.user.name}</span>
                  <button onClick={auth.logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm">Login</Link>
                  <Link to="/register" className="text-sm">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
