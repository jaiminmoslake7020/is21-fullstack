import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Tooltip} from '@mui/material';
import users from '../data/api-data/users.json';
import {useAppDispatch} from '../redux/store';
import {login} from '../redux/reducers/user';
import {capitalize} from '../utils/helpers/string';

export type HomePropTypes = {

};

function Home(props: HomePropTypes) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="login-page" >
      <div className="login-page-container">
        <h2>Simplified User Login Page</h2>
        <div className="btn-list" >
          {
            users.map((user : any) => (
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
