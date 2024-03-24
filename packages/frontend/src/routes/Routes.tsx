import {createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Home from '../views/Home';
import UserList from '../views/users/List';

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
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />
}
