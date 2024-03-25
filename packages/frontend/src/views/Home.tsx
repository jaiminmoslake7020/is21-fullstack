import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Tooltip} from '@mui/material';
import {useAppDispatch} from '../redux/store';
import {login} from '../redux/reducers/user';
import {capitalize} from '../utils/helpers/string';
import {getUsers} from '../services/api';
import {User} from '../types/app';
import {addNewErrorMsgWithTitle} from '../utils/helpers/feedback';
import {addNotification} from '../redux/reducers/feedback';

export type HomePropTypes = {

};

function Home(props: HomePropTypes) {
  const navigate = useNavigate();
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
    <div className="login-page" >
      <div className="login-page-container">
        <h2>Simplified User Login Page</h2>
        <div className="btn-list" >
          {
            users && users.filter((u) => u.userStatus === 'enabled').map((user : any) => (
              <Tooltip key={user.id} title={`Login as ${capitalize(user.name)}`} >
                <button
                  type="button"
                  className="btn btn-primary capitalize"
                  onClick={(e) => {
                    dispatch(login(user));
                  }}
                >
                  {user.name}
                </button>
              </Tooltip>
            ))
          }
        </div>
      </div>
    </div>
  );
}

Home.defaultProps = {};

export default Home;
