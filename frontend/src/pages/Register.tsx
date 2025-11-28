import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext)!;
  const nav = useNavigate();
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      auth.login(res.data.token, res.data.user);
      nav('/');
    } catch (error: any) {
      setErr(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-colors border border-gray-200 dark:border-gray-700">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="logo" className="h-14 w-auto" />
        </div>

        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Create an account
        </h3>

        {/* Error box */}
        {err && (
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-3 text-sm">
            {err}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="w-full mt-1 p-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="Enter a strong password"
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 rounded-lg font-medium">
            Register
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
