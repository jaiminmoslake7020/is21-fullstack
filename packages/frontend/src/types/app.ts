export type PaintColour = 'blue' | 'grey' | 'black' | 'white' | 'purple';

export type Paint = {
  name: PaintColour,
  stockStatus: 'available' | 'running-low' | 'out-of-stock'
};

export type User = {
  username: string,
  name: string,
  role: 'painter' | 'inventory-manager' | 'system-admin',
};
