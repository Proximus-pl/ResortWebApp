import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const navigate = useNavigate();

 const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email || !roomNumber || !guestName) return;

    // Save session info to localStorage for use in booking
    localStorage.setItem('guest_session', JSON.stringify({ email, roomNumber, guestName }));
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl dark:shadow-2xl w-full max-w-md p-8 text-slate-900 dark:text-white transition-colors duration-200">
        <div className="flex items-center justify-center mb-6 text-amber-500 dark:text-amber-400 transition-colors">
          <Sun className="w-12 h-12 animate-spin-slow" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Azure Horizon Resort</h1>
        <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-6 transition-colors">Enter your guest details to access the poolside cabana portal.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1 transition-colors">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="guest@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1 transition-colors">Guest Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Jane Doe"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1 transition-colors">Room Number</label>
            <input 
              type="text" 
              required
              placeholder="104"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
            />
          </div>
          <button 
            type="submit"
            className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            Access Resort Map
          </button>
        </form>
      </div>
    </div>
  );
};