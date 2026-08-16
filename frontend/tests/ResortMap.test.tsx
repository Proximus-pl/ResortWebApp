import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import { ResortMap } from '../src/components/ResortMap'; 

// 1. Mock fetch
globalThis.fetch = vi.fn() as any;

// 2. Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {
    guest_session: JSON.stringify({ roomNumber: '101', guestName: 'Alice' }),
  };
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

const mockMapData = {
  width: 2, height: 1,
  tiles: [
    [
      { id: 'W_0_0', x: 0, y: 0, type: 'W', isBooked: false },
      { id: 'W_1_0', x: 1, y: 0, type: 'W', isBooked: true, bookedBy: { roomNumber: '101' } }
    ]
  ]
};

describe('ResortMap UI', () => {
  beforeEach(() => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockMapData,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders map and handles clicking an unavailable cabana', async () => {
    render(
      <MemoryRouter>
        <ResortMap />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTitle(/Tile \(0, 0\)/i)).toBeInTheDocument(); 
    });

    const bookedCabana = screen.getByTitle(/Booked by Room 101/i);
    fireEvent.click(bookedCabana); 
      
    await waitFor(() => {
      expect(screen.getByText(/is already booked/i)).toBeInTheDocument();
    });
  });

  it('opens booking modal when clicking an available cabana', async () => {
    render(
      <MemoryRouter>
        <ResortMap />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTitle(/Tile \(0, 0\)/i)).toBeInTheDocument(); 
    });

    const availableCabana = screen.getByTitle(/Tile \(0, 0\)/i);
    fireEvent.click(availableCabana); 
      
    await waitFor(() => {
      expect(screen.getByText(/Book Cabana/i)).toBeInTheDocument();
    });
  });
});