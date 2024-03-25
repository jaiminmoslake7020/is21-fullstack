import React, { useState, useCallback} from 'react';
import { useForm } from 'react-hook-form';
import {FormControl, Checkbox, FormControlLabel} from '@mui/material';
import {User} from '../../types/app';

function UserUpdateForm(props: { defaultValues : User, onSubmit : Function }) {
  const {
    defaultValues, onSubmit
  } = props;

  const { permissions } = defaultValues;
  const { users, 'paint-colours': paintColours } = permissions;
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  const [userView, setUserView] = useState<boolean>(users ? users.includes('view') : false);
  const [userUpdate, setUserUpdate] = useState<boolean>(users ? users.includes('update') : false);
  const [paintColorView, setPaintColorView] = useState<boolean>(paintColours ? paintColours.includes('view') : false);
  const [paintColorUpdate, setPaintColorUpdate] = useState<boolean>(paintColours ? paintColours.includes('update') : false);
  const addPermissions = !(userView || userUpdate || paintColorView || paintColorUpdate);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormSubmit = useCallback((data:any) => {
    if (!addPermissions) {
      setFormSubmitted(true);
      let permissionsNew = {users: [], 'paint-colours': []} as Record<string, string[]>;
      if (userView) {
        permissionsNew = {...permissionsNew, users: [...permissionsNew.users, 'view']}
      }
      if (userUpdate) {
        permissionsNew = {...permissionsNew, users: [...permissionsNew.users, 'update']}
      }
      if (paintColorView) {
        permissionsNew = {...permissionsNew, 'paint-colours': [...permissionsNew['paint-colours'], 'view']}
      }
      if (paintColorUpdate) {
        permissionsNew = {...permissionsNew, 'paint-colours': [...permissionsNew['paint-colours'], 'update']}
      }
      onSubmit({...data, permissions: permissionsNew});
    }
  }, [addPermissions, userView, userUpdate, paintColorView, paintColorUpdate, onSubmit]);

  return (
    <form className="user-update-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl className="form-control">
        <label htmlFor="name">Name</label>
        <div className="input-holder" >
          <input type="text" id="name" {...register('name', { required: true })} />
          {errors.name && <span>Name is required</span>}
        </div>
      </FormControl>
      <FormControl className="form-control" >
        <label htmlFor="username">Username</label>
        <div className="input-holder">
          <input type="text" id="username" {...register('username', { required: true })} />
          {errors.username && <span>Username is required</span>}
        </div>
      </FormControl>
      <FormControl className="form-control" >
        <label htmlFor="role">Role</label>
        <div className="input-holder" >
          <div className="select-wrapper" >
            <select id="role"
              {...register('role', {
                required: true,
                onChange: (v:any) => {
                  console.log(v.target.value);
                  const {value} = v.target;
                  if (value === 'system-admin') {
                    setUserUpdate(true);
                    setUserView(true);
                    setPaintColorUpdate(false);
                    setPaintColorView(false);
                  } else if (value === 'painter' || value === 'inventory-manager') {
                    setUserUpdate(false);
                    setUserView(false);
                    setPaintColorUpdate(true);
                    setPaintColorView(true);
                  }
                }
              })
              }
            >
              <option value="">Select Role</option>
              <option value="system-admin">System Admin</option>
              <option value="painter">Painter</option>
              <option value="inventory-manager">Inventory Manager</option>
            </select>
          </div>
          {errors.role && <span>Role is required</span>}
        </div>
      </FormControl>
      <p className="text-gray-600 text-xs " >Changing role will update role permissions and admin can further still update resource level permissions.</p>
      <FormControl className="form-control" >
        <label htmlFor="userStatus">User Status</label>
        <div className="input-holder" >
          <div className="select-wrapper" >
            <select id="userStatus"
              {...register('userStatus', {
                required: true
              })}>
              <option value="">Select User Status</option>
              <option value="enabled">Enabled</option>
              <option value="disbaled">Disabled</option>
            </select>
          </div>
          {errors.userStatus && <span>User Status is required</span>}
        </div>
      </FormControl>
      <label className="font-semmibold" >Permissions</label>
      <FormControl className="form-control-checkbox" >
        <label htmlFor="userStatus">User</label>
        <div className="" >
          <FormControlLabel
            control={(
              <Checkbox inputProps={{
                'aria-label': 'User View'
              }}
              checked={userView}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserView(event.target.checked);
              }}
              />
            )}
            label="View"
          />
          <FormControlLabel
            control={(
              <Checkbox inputProps={{
                'aria-label': 'User Update'
              }}
              checked={userUpdate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserUpdate(event.target.checked);
              }} />
            )}
            label="Update"
          />
        </div>
      </FormControl>
      <FormControl className="form-control-checkbox" >
        <label htmlFor="userStatus">Paint Colour</label>
        <div className="" >
          <FormControlLabel
            control={(
              <Checkbox inputProps={{
                'aria-label': 'Paint Colour View'
              }}
              checked={paintColorView}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPaintColorView(event.target.checked);
              }} />
            )}
            label="View"
          />
          <FormControlLabel
            control={(
              <Checkbox inputProps={{
                'aria-label': 'Paint Colour Update'
              }}
              checked={paintColorUpdate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPaintColorUpdate(event.target.checked);
              }} />
            )}
            label="Update"
          />
        </div>
      </FormControl>
      {
        addPermissions ? <p className="text-xs text-red-400">Please choose at-least one role permission.</p> : null
      }
      <button className="btn btn-primary mt-4" type="submit" disabled={formSubmitted} >Update User</button>
    </form>
  );
}

export default UserUpdateForm;
