import {
  createBrowserRouter, RouteObject, RouterProvider, Navigate
} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Home from '../views/Home';
import Board from '../views/paint-colours/Board';
import UserList from '../views/users/List';
import UserUpdate from '../views/users/Update'
import {useAppSelector} from '../redux/store';

export default function Routes() {
  const {
    user
  } = useAppSelector(store => store.user);

  const {
    role, permissions
  } = user || {};
  const { 'paint-colours': PaintColours, users } = (permissions || {});
  const [routes, setRoutes] = useState<RouteObject[]>([]);

  useEffect(() => {
    const mount = () => {
      if (user === null) {
        setRoutes([{
          path: '/',
          element: (
            <Home />
          ),
        },
        {
          path: '/:anything',
          element: (
            <Navigate to="/" />
          ),
        },
        {
          path: '/:anything/:anything',
          element: (
            <Navigate to="/" />
          ),
        }, {
          path: '/:anything/:anything/:anything',
          element: (
            <Navigate to="/" />
          ),
        }]);
      } else {
        const newRoutes = [];
        if (PaintColours && PaintColours.length >= 0) {
          newRoutes.push({
            path: '/',
            element: (
              <Board />
            ),
          });
        } else if (users && users.length >= 0) {
          newRoutes.push({
            path: '/',
            element: (
              <UserList />
            ),
          });
          newRoutes.push({
            path: '/users',
            element: (
              <UserList />
            ),
          });
          newRoutes.push({
            path: '/users/:id/update',
            element: (
              <UserUpdate />
            ),
          });
        }
        setRoutes(newRoutes);
      }
    };
    return mount();
  }, [PaintColours, users, user])

  return routes.length > 0 ? <RouterProvider router={createBrowserRouter(routes)} /> : null
}
