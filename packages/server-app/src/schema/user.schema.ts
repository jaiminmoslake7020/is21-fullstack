import { object, string, array, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Users:
 *       type: object
 *       required:
 *        - name
 *        - username
 *        - role
 *        - userStatus
 *        - permissions
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: date
 *         methodology:
 *           type: string
 *         role:
 *           type: string
 *         userStatus:
 *           type: string
 *         permissions:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                  type: string
 *             "paint-colours":
 *                type: array
 *                items:
 *                  typer: string
 */

const payload = {
  body: object({
    name: string({
      required_error: "User Name is required",
    }),
    username: string({
      required_error: "User username is required",
    }),
    role: string({
      required_error: "Role is required",
    }),
    userStatus: string({
      required_error: "Status is required",
    }),
    permissions: object({
      users: array(string({
        required_error: "Permissions 'users' is required",
      })),
      "paint-colours": array(string({
        required_error: "Permissions 'paint-colours' is required",
      })),
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
};

export const updateUserSchema = object({
  ...payload,
  ...params,
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
