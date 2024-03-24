import {createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Home from '../views/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Home />
    ),
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />
}