import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext)!;
  const nav = useNavigate();
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      auth.login(res.data.token, res.data.user);
      nav('/');
    } catch (error: any) {
      setErr(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo.svg" alt="logo" className="h-12 w-auto" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center">Welcome back</h3>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 rounded">Login</button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account? <a href="/register" className="text-indigo-600">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
