export type PaintColour = 'blue' | 'gray' | 'black' | 'white' | 'purple';

export type Paint = {
  name: PaintColour,
  stockStatus: 'available' | 'running-low' | 'out-of-stock'
};

export type Resources = 'paint-colours' | 'users';

export type Actions = 'view' | 'update';

export type User = {
  username: string,
  name: string,
  role: 'painter' | 'inventory-manager' | 'system-admin',
  permissions: Record<Resources, Actions[]>
};
