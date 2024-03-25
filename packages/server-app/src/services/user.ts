import {AppDataSource} from '../data-source';
import {Error} from '../schema/error.schema'
import {User} from '../models/User';
import {UpdateUserInput} from '../schema/user.schema';

const getUserRepo = () => {
    return AppDataSource.getRepository(User)
}

export const getUsers = async ():Promise<User[]> => {
    const users =  await getUserRepo().find();
    return users.map(user => ({...user, permissions: JSON.parse(user.permissions)}));
}

export const getUserById = async (id: string):Promise<User> => {
    const user = await getUserRepo().findOneBy({
        id
    });
    return {...user, permissions: JSON.parse(user.permissions)};
}

export const updateUser = async (userInput:UpdateUserInput):Promise<User|Error> => {
    const {
        id,
    } = userInput.params;
    const {
        name,
        username,
        role,
        userStatus,
        permissions
    } = userInput.body;

    const user = await getUserById(id);
    if (!user) {
        return  {
            status: 404,
            message: "User not found."
        };
    }
    const newUser = Object.assign(user, {
        name,
        username,
        role,
        userStatus,
        permissions
    });

    await getUserRepo().save(newUser);
    return await getUserById(id);
}
