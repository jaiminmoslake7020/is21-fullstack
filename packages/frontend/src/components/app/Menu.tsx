import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../redux/store';
import {ResourceActionsMap} from '../../types/app';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
                Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          canView || canUpdate
            ? (
              <MenuItem onClick={(e) => {
                navigate('/users');
                handleClose();
              }}>
                      Paint Colours
              </MenuItem>
            ) : null
        }
        {
          canUserView || canUserUpdate
            ? (
              <MenuItem onClick={(e) => {
                navigate('/users');
                handleClose();
              }}>
                          Users
              </MenuItem>
            ) : null
        }
      </Menu>
    </div>
  );
}
