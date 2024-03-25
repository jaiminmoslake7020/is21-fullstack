import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logout} from '../../redux/reducers/user';
import Icon from '../base/Icon';
import Menu from './Menu';
import {ResourceActionsMap} from '../../types/app';

function Header() {
  const {
    user
  } = useAppSelector((store) => store.user);

  const {
    role, permissions
  } = user || {};
  const { 'paint-colours': PaintColours, users } = permissions || {} as ResourceActionsMap;
  const canView = PaintColours ? PaintColours.includes('view') : false;
  const canUpdate = PaintColours ? PaintColours.includes('update') : false;
  const canUserView = PaintColours ? users.includes('view') : false;
  const canUserUpdate = PaintColours ? users.includes('update') : false;

  const dispatch = useAppDispatch();
  return (
    user
      ? (
        <header className="header-wrapper" >
          <div className="flex gap-4 itesm-center">
            <Menu />
            <div className="flex gap-2 items-center font-bold">
              <Icon icon="user" />
              <span className="capitalize">{user.name}</span>
              <span className="capitalize">-</span>
              <span className="capitalize">{user.role.replaceAll('-', ' ')}</span>
            </div>
            <button type="button"
              className="btn btn-red btn-icon"
              onClick={() => {
                dispatch(logout())
              }} >
              <Icon icon="power-off" />
              <span>Logout</span>
            </button>
          </div>
        </header>
      ) : null
  );
}

Header.defaultProps = {};

export default Header;
