import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import users from '../../data/api-data/users.json';
import UserUpdateForm from '../../components/app/UserUpdateForm';
import {User} from '../../types/app';

function Update() {
  const {
    id
  } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mount = () => {
      const usersFiltered = users.filter((u:any) => {
        return u.id === id;
      });
      if (usersFiltered && usersFiltered.length === 1) {
        setUser(usersFiltered[0] as any as User);
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
                console.log('updated user', newData);
              }} />
          ) : null
      }
    </div>
  );
}

Update.defaultProps = {};

export default Update;
