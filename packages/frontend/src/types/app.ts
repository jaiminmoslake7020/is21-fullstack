export type PaintColour = 'blue' | 'gray' | 'black' | 'white' | 'purple';

export type Paint = {
  name: PaintColour,
  stockStatus: 'available' | 'running-low' | 'out-of-stock'
};

export type Resources = 'paint-colours' | 'users';

export type Actions = 'view' | 'update';

export type ResourceActionsMap = Record<Resources, Actions[]>;

export type UserStatus = 'enabled' | 'disabled';

export type User = {
  id: string,
  username: string,
  name: string,
  role: 'painter' | 'inventory-manager' | 'system-admin',
  permissions: ResourceActionsMap,
  userStatus: UserStatus
};
