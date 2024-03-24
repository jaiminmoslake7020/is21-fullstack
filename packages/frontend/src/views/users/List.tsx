import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import users from '../../data/api-data/users.json';
import {
  ResourceActionsMap, Resources, User, Actions, UserStatus
} from '../../types/app';

function ResourcesAction(props: {
  resource: Resources, action: Actions
}): JSX.Element {
  const {resource, action} = props;
  return (
    <div className="resource-action" >
      <span className="resource-span">{resource}</span>
      <span className="action-span">{action}</span>
    </div>
  )
}

function ResourcesActionList(props: {
  resource: Resources, actions: Actions[]
}): JSX.Element {
  const {resource, actions} = props;
  return (
    <div className="action-list" >
      {
        actions.map((action:Actions, index: number) => <ResourcesAction key={`${resource}-${action}-${index}` as string} resource={resource} action={action} />)
      }
    </div>
  )
}

const columns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    sortable: true,
    renderCell: (params) => <p className="capitalize" >{params.value}</p>
  },
  {
    field: 'username',
    headerName: 'User Name',
    width: 150,
    sortable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    type: 'string',
    width: 250,
    sortable: true,
    renderCell: (params) => <p className="capitalize" >{params.value.replace('-', ' ')}</p>
  },
  {
    field: 'permissions',
    headerName: 'Permission',
    sortable: false,
    width: 300,
    renderCell: (params) => {
      const permissions = params.value as ResourceActionsMap;
      const resourcesArray = Object.keys(permissions) as Resources[];
      return (
        <div className="permissions">
          {
            Object.keys(permissions).map((x:Resources | string) : JSX.Element => (<ResourcesActionList resource={x as Resources} actions={permissions[x as Resources]} />))
          }
        </div>
      )
    }
  },
  {
    field: 'userStatus',
    headerName: 'Status',
    sortable: false,
    width: 300,
    renderCell: (params) => {
      const status = params.value as UserStatus;
      return (
        <div className="status-btns">
          {
            status === 'enabled' ? <button type="button" disabled className="btn btn-blue btn-xs " >Enabled</button> : <button type="button" className="btn btn-white btn-xs" >Enable</button>
          }
          {
            status === 'enabled' ? <button type="button" className="btn btn-white btn-xs" >Disable</button> : <button type="button" disabled className="btn btn-red btn-xs " >Disabled</button>
          }
        </div>
      )
    }
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <div className="actions">
          <button type="button" className="btn btn-primary" >Update</button>
        </div>
      )
    }
  },
];

function List() {
  return (
    <div className="user-list-page" >
      <DataGrid
        rows={users as User[]}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </div>
  );
}

List.defaultProps = {};

export default List;
