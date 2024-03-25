import React, {useCallback, useEffect, useState} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {Tooltip} from '@mui/material';
import {
  ResourceActionsMap, Resources, User, Actions, UserStatus
} from '../../types/app';
import Icon from '../../components/base/Icon';
import {getUsers, updateUser} from '../../services/api';
import {addNewErrorMsgWithTitle, addNewSuccessMsgWithTitle} from '../../utils/helpers/feedback';
import {addNotification} from '../../redux/reducers/feedback';
import Loading from '../../components/base/Loading';
import {useAppDispatch} from '../../redux/store';

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
    disableColumnMenu: true,
    renderCell: (params) => {
      const permissions = params.value as ResourceActionsMap;
      const resourcesArray = Object.keys(permissions) as Resources[];
      return (
        <div className="permissions">
          {
            Object.keys(permissions).map((x:Resources | string, index) : JSX.Element => (<ResourcesActionList key={`${x}-${index}`} resource={x as Resources} actions={permissions[x as Resources]} />))
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
    disableColumnMenu: true,
    renderCell: (params) => {
      const {id} = params.row;
      const dispatch = useAppDispatch();
      const [status, setStatus] = useState<UserStatus>(params.value as UserStatus);

      const updateUserFn = useCallback((newStatus:'enabled' | 'disabled') => {
        updateUser(id, {
          ...params.row, userStatus: newStatus
        }).then((responseMain) => {
          const { isSuccess, error, response } = responseMain;
          if (isSuccess && response) {
            dispatch(addNotification(addNewSuccessMsgWithTitle('Success', 'User updated successfully.')));
            setStatus(newStatus);
          } else {
            const eTwo = addNewErrorMsgWithTitle();
            dispatch(addNotification(eTwo));
          }
        });
      }, [id]);

      return (
        <Tooltip title={`This user is ${status}.`} >
          <div className="status-btns">
            {
              status === 'enabled' ? <button type="button" disabled className="btn btn-blue btn-xs " >Enabled</button> : (
                <button type="button"
                  className="btn btn-white btn-xs"
                  onClick={() => {
                    updateUserFn('enabled');
                  }}
                >
Enable
                </button>
              )
            }
            {
              status === 'enabled' ? (
                <button type="button"
                  className="btn btn-white btn-xs"
                  onClick={() => {
                    updateUserFn('disabled');
                  }}
                >
Disable
                </button>
              ) : <button type="button" disabled className="btn btn-red btn-xs " >Disabled</button>
            }
          </div>
        </Tooltip>
      )
    }
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 160,
    disableColumnMenu: true,
    renderCell: (params) => {
      const navigate = useNavigate();
      const {role} = params.row;
      return (
        <div className="actions">
          {
            role !== 'system-admin'
              ? (
                <button
                  type="button"
                  className="btn btn-white btn-icon btn-xs"
                  onClick={() => {
                    navigate(`/users/${params.row.id}/update`);
                  }}
                >
                  <Icon insideBtn icon="pencil-alt" />
                  <span>Update</span>
                </button>
              ) : 'Not Allowed'
          }
        </div>
      )
    }
  },
];

function List() {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const mount = () => {
      getUsers().then((responseMain) => {
        const { isSuccess, error, response } = responseMain;
        if (isSuccess && response) {
          setUsers(response);
        } else {
          const eTwo = addNewErrorMsgWithTitle();
          dispatch(addNotification(eTwo));
        }
      });
    };
    return mount();
  }, []);

  return (
    <div className="user-list-page" >
      {
        users
          ? (
            <DataGrid
              rows={users as any as User[]}
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
          ) : <Loading />
      }
    </div>
  );
}

List.defaultProps = {};

export default List;
