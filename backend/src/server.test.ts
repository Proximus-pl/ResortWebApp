import request from 'supertest';
import fs from 'fs';
import app from './server';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock the file system so we don't overwrite real data during tests
jest.mock('fs');

describe('Resort Map API', () => {
  const mockMapData = "Wp#\n.cW";
  const mockBookings = [
    { cabanaId: "W_0_0", roomNumber: "101", guestName: "Alice" }
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
    
    // CHANGE THIS LINE: use (path: any) instead of (path: string)
    (fs.readFileSync as jest.Mock).mockImplementation((path: any) => {
      if (path.includes('map.ascii')) return mockMapData;
      if (path.includes('bookings.json')) return JSON.stringify(mockBookings);
      return '';
    });
    
    (fs.existsSync as jest.Mock).mockReturnValue(true);
  });

  it('GET /api/map should return parsed map layout and cabana availability', async () => {
    const res = await request(app).get('/api/map');
    
    expect(res.status).toBe(200);
    expect(res.body.width).toBe(3);
    expect(res.body.height).toBe(2);
    
    // Check if cabana W_0_0 is correctly marked as booked
    const firstCabana = res.body.tiles[0][0];
    expect(firstCabana.type).toBe('W');
    expect(firstCabana.isBooked).toBe(true);
    expect(firstCabana.bookedBy.guestName).toBe('Alice');
  });

  it('POST /api/bookings should reject booking if guest details do not match', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ cabanaId: 'W_2_1', roomNumber: '999', guestName: 'Stranger' });

    expect(res.status).toBe(401);
    expect(res.body.message).toContain('Authentication failed');
  });

  it('POST /api/bookings should reject booking if cabana is already taken', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ cabanaId: 'W_0_0', roomNumber: '101', guestName: 'Alice' });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('already booked');
  });

  it('POST /api/bookings should succeed for a valid guest and available cabana', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ cabanaId: 'W_2_1', roomNumber: '101', guestName: 'Alice' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(fs.writeFileSync).toHaveBeenCalled(); // Verifies data was "saved"
  });
});