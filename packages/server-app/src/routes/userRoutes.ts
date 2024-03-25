import { Express } from "express";
import validateResource from "../middleware/validateResource";
import {getUsersHandler, listUsersHandler, updateUserHandler} from '../controller/UserController';
import { updateUserSchema } from '../schema/user.schema';

function userRoutes(app: Express) {

    /**
     * @openapi
     * '/api/users/:id':
     *   get:
     *     tags:
     *     - Users
     *     summary: Get user
     *     parameters:
     *     - name: id
     *       in: path
     *     responses:
     *       '200':
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Users'
     *       '404':
     *         description: Users not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     *       '500':
     *         description: Internal Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     */
    app.get(
        "/api/users/:id",
        getUsersHandler
    );

    /**
     * @openapi
     * '/api/users':
     *   get:
     *     tags:
     *     - Users
     *     summary: List all users
     *     responses:
     *       '200':
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schema/Users'
     *       '404':
     *         description: Users not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     *       '500':
     *         description: Internal Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     */
    app.get(
        "/api/users",
        listUsersHandler
    );


    /**
     * @openapi
     * '/api/users/:id':
     *   put:
     *     tags:
     *       - Users
     *     summary: Update User
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *       - in: body
     *         name: body
     *         description: Users Info
     *         required: true
     *         schema:
     *           $ref: '#/components/schema/Users'
     *     responses:
     *       '200':
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Users'
     *       '404':
     *         description: Users not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     *       '500':
     *         description: Internal Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     */
    app.put(
        "/api/users/:id",
        validateResource(updateUserSchema),
        updateUserHandler
    );
}

export default userRoutes;
