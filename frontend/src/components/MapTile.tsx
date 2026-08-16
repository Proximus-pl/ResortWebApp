import React from 'react';
import type { MapTileData } from '../types';

// Import your image assets
import cabanaImg from '../assets/cabana.png';
import poolImg from '../assets/pool.png';
import houseImg from '../assets/houseChimney.png';
import pathImg from '../assets/parchmentBasic.png';

interface MapTileProps {
  tile: MapTileData;
  onClick: (tile: MapTileData) => void;
}

export const MapTile: React.FC<MapTileProps> = ({ tile, onClick }) => {
  // Map the ASCII characters to your image imports
  const getTileImage = (type: string) => {
    switch (type) {
      case 'W': return cabanaImg;
      case 'p': return poolImg;
      case 'c': return houseImg;
      case '#': return pathImg;
      default: return null;
    }
  };

  // Keep the interactive styles, but remove the text colors since we use images now
  const getTileStyle = (tile: MapTileData) => {
    switch (tile.type) {
      case 'W':
        return tile.isBooked 
          ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30 cursor-not-allowed' 
          : 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/50 hover:bg-amber-100 dark:hover:bg-amber-500/30 cursor-pointer shadow-sm dark:shadow-lg hover:scale-105';
      case 'p':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50';
      case 'c':
        return 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700';
      case '#':
        return 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50';
      default:
        // For '.' (empty space)
        return 'border-transparent bg-transparent';
    }
  };

  const imgSrc = getTileImage(tile.type);

  return (
    <button
      onClick={() => onClick(tile)}
      disabled={tile.type !== 'W'}
      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200 relative overflow-hidden group ${getTileStyle(tile)}`}
      title={tile.isBooked ? `Booked by Room ${tile.bookedBy?.roomNumber}` : `Tile (${tile.x}, ${tile.y}) - Type: ${tile.type}`}
    >
      {imgSrc && (
        <img 
          src={imgSrc} 
          alt={tile.type} 
          className={`w-[80%] h-[80%] object-contain drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity ${
            tile.type !== '#' ? 'dark:invert dark:brightness-200' : ''
          }`}
        />
      )}
      
      {/* Red X overlay for booked cabanas */}
      {tile.type === 'W' && tile.isBooked && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
          <span className="text-rose-500 font-black text-lg drop-shadow-md">✕</span>
        </div>
      )}
    </button>
  );
};