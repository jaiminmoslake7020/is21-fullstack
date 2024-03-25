import {createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Home from '../views/Home';
import UserList from '../views/users/List';
import UserUpdate from '../views/users/Update'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Home />
    ),
  },
  {
    path: '/users',
    element: (
      <UserList />
    ),
  },
  {
    path: '/users/:id/update',
    element: (
      <UserUpdate />
    ),
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />
}
