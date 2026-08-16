export type TileType = 'W' | 'p' | '#' | 'c' | '.';

export interface MapTileData {
  id: string;
  x: number;
  y: number;
  type: TileType;
  isBooked?: boolean;
  bookedBy?: {
    roomNumber: string;
    guestName: string;
  };
}

export interface MapApiResponse {
  width: number;
  height: number;
  tiles: MapTileData[][];
}