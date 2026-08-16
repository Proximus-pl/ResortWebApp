import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  tileId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ tileId, onClose, onSuccess }) => {
  const session = JSON.parse(localStorage.getItem('guest_session') || '{}');
  const [roomNumber, setRoomNumber] = useState(session.roomNumber || '');
  const [guestName, setGuestName] = useState(session.guestName || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cabanaId: tileId, roomNumber, guestName })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Booking validation failed.');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 text-slate-900 dark:text-white shadow-2xl relative transition-colors duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          Book Cabana {tileId}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Confirm your details to reserve this poolside spot.</p>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1">Room Number</label>
            <input 
              type="text"
              required
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1">Guest Name</label>
            <input 
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {loading ? 'Confirming...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
};