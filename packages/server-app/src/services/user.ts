import {AppDataSource} from '../data-source';
import {Error} from '../schema/error.schema'
import {User} from '../models/User';
import {UpdateUserInput} from '../schema/user.schema';

const getUserRepo = () => {
    return AppDataSource.getRepository(User)
}

export const getUsers = async ():Promise<User[]> => {
    return  await getUserRepo().find();
}

export const getUserById = async (id: string):Promise<User> => {
    return await getUserRepo().findOneBy({
        id
    });
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
