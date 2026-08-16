import React, { useEffect, useState } from 'react';
import type { MapApiResponse, MapTileData } from '../types';
import { BookingModal } from '../components/BookingModal';
import { MapTile } from '../components/MapTile';
import { Sun, LogOut, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ResortMap: React.FC = () => {
  const [mapData, setMapData] = useState<MapApiResponse | null>(null);
  const [selectedTile, setSelectedTile] = useState<MapTileData | null>(null);
  const [unavailableMessage, setUnavailableMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMap = async () => {
    try {
      // Fetching the real data from your Node.js backend!
      const res = await fetch('/api/map');
      if (!res.ok) throw new Error('Failed to fetch map data');
      
      const data = await res.json();
      setMapData(data);
    } catch (err) {
      console.error('Failed to load map layout', err);
    }
  };

  useEffect(() => {
    fetchMap();
  }, []);

  const handleTileClick = (tile: MapTileData) => {
    setUnavailableMessage(null);
    if (tile.type === 'W') {
      if (tile.isBooked) {
        setUnavailableMessage(`Cabana ${tile.id} is already booked by Room ${tile.bookedBy?.roomNumber || 'Unknown'}.`);
      } else {
        setSelectedTile(tile);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pl-6 pr-20 py-4 flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-3">
          <Sun className="w-8 h-8 text-amber-500 dark:text-amber-400" />
          <span className="font-bold text-lg tracking-wide">Azure Horizon Resort</span>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('guest_session'); navigate('/'); }}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl dark:shadow-2xl transition-colors duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Interactive Resort Map</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Click an available cabana (W) to book your lounging spot.</p>
            </div>
            {/* Legend */}
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-400 dark:bg-amber-500 rounded-sm"></span> Cabana (W)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-400 dark:bg-blue-600 rounded-sm"></span> Pool (p)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-sm"></span> Path (#)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm"></span> Chalet (c)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-transparent border border-dashed border-slate-300 dark:border-slate-700 rounded-sm"></span> Empty (.)</span>
            </div>
          </div>

          {unavailableMessage && (
            <div className="mb-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              {unavailableMessage}
            </div>
          )}

          {/* Map Grid */}
          <div className="flex justify-center overflow-auto py-4">
            {mapData ? (
              <div 
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${mapData.width}, minmax(0, 1fr))` }}
              >
                {mapData.tiles.flat().map((tile) => (
                  <MapTile 
                    key={tile.id} 
                    tile={tile} 
                    onClick={handleTileClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-slate-400 dark:text-slate-500 animate-pulse">Loading resort layout...</div>
            )}
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {selectedTile && (
        <BookingModal 
          tileId={selectedTile.id}
          onClose={() => setSelectedTile(null)}
          onSuccess={fetchMap}
        />
      )}
    </div>
  );
};