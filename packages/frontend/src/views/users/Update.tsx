import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import UserUpdateForm from '../../components/app/UserUpdateForm';
import {User} from '../../types/app';
import {useAppDispatch} from '../../redux/store';
import {getUser, updateUser} from '../../services/api';
import {addNewErrorMsgWithTitle, addNewSuccessMsgWithTitle} from '../../utils/helpers/feedback';
import {addNotification} from '../../redux/reducers/feedback';

function Update() {
  const {
    id
  } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mount = () => {
      if (id) {
        getUser(id).then((responseMain) => {
          const { isSuccess, error, response } = responseMain;
          if (isSuccess && response) {
            setUser(response);
          } else {
            const eTwo = addNewErrorMsgWithTitle();
            dispatch(addNotification(eTwo));
          }
        });
      }
    };
    return mount();
  }, [id]);

  const updateUserFn = useCallback((newData:User) => {
    const mount = () => {
      if (id) {
        updateUser(newData.id, newData).then((responseMain) => {
          const { isSuccess, error, response } = responseMain;
          if (isSuccess && response) {
            setUser(response);
            dispatch(addNotification(addNewSuccessMsgWithTitle('Success', 'User updated successfully.')));
            navigate('/users');
          } else {
            const eTwo = addNewErrorMsgWithTitle();
            dispatch(addNotification(eTwo));
          }
        });
      }
    };
    return mount();
  }, [id]);

  return (
    <div className="user-update-page" >
      {
        user
          ? (
            <UserUpdateForm
              defaultValues={user as User}
              onSubmit={(newData:User) => {
                updateUserFn(newData);
              }} />
          ) : null
      }
    </div>
  );
}

Update.defaultProps = {};

export default Update;
