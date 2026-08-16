import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const args = process.argv.slice(2);
const getArgPath = (flag: string, defaultFileName: string) => {
  const index = args.indexOf(flag);
  // If flag exists, use the provided path, otherwise default to working directory
  return index !== -1 ? path.resolve(args[index + 1]) : path.join(process.cwd(), defaultFileName);
};

const MAP_PATH = getArgPath('--map', 'map.ascii');
const BOOKINGS_PATH = getArgPath('--bookings', 'bookings.json');

// Helper to read bookings safely
const getBookings = () => {
  if (!fs.existsSync(BOOKINGS_PATH)) return [];
  const data = fs.readFileSync(BOOKINGS_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper to read and parse the ASCII map
const getMapData = () => {
  const ascii = fs.readFileSync(MAP_PATH, 'utf-8');
  const lines = ascii.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const height = lines.length;
  const width = height > 0 ? lines[0].length : 0;
  const bookings = getBookings();

  const tiles = lines.map((row, y) => {
    return row.split('').map((char, x) => {
      const id = `${char}_${x}_${y}`;
      const tile: any = { id, x, y, type: char };

      // If it's a cabana, check if it's booked
      if (char === 'W') {
        const booking = bookings.find((b: any) => b.cabanaId === id);
        tile.isBooked = !!booking;
        if (booking) {
          tile.bookedBy = { roomNumber: booking.roomNumber, guestName: booking.guestName };
        }
      }
      return tile;
    });
  });

  return { width, height, tiles };
};

// Endpoint to get the map
app.get('/api/map', (req, res) => {
  try {
    res.json(getMapData());
  } catch (error) {
    res.status(500).json({ message: 'Error reading map data' });
  }
});

// Endpoint to book a cabana
app.post('/api/bookings', (req, res) => {
  try {
    const { cabanaId, roomNumber, guestName } = req.body;
    const bookings = getBookings();

    // 1. VALIDATION: Check if room number and name match a current guest
    const guestIndex = bookings.findIndex((b: any) => 
      String(b.roomNumber) === String(roomNumber) && 
      b.guestName.toLowerCase() === guestName.toLowerCase()
    );

    if (guestIndex === -1) {
      return res.status(401).json({ message: 'Authentication failed: Guest name and room number do not match our records.' });
    }

    // 2. Check if the cabana itself is already booked by anyone
    if (bookings.some((b: any) => b.cabanaId === cabanaId)) {
      return res.status(400).json({ message: 'This cabana is already booked.' });
    }

    // 3. Save the new booking to the existing guest's record
    bookings[guestIndex].cabanaId = cabanaId;
    fs.writeFileSync(BOOKINGS_PATH, JSON.stringify(bookings, null, 2));

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error saving booking' });
  }
});

const PORT = 3000;
// Only start listening if this file is run directly (not imported in a test)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app; // Export app for testing