import { Request, Response } from "express"
import {updateUser, getUsers, getUserById} from '../services/user';
import {UpdateUserInput} from '../schema/user.schema';


export const listUsersHandler = async(request: Request, response: Response)=> {
    try{
        const products = await getUsers();
        return response.json(products);
    } catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to list developers.",
            e
        });
    }
}

export const getUsersHandler = async(request: Request, response: Response)=> {
    try{
        const products = await getUserById(request.params.id);
        return response.json(products);
    } catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to list user.",
            e
        });
    }
}


export const updateUserHandler = async(request: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>, response: Response)=> {
    try{
        return response.json(await updateUser(request));
    } catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to update user.",
            e
        });
    }
}
