import { object, string, TypeOf, array } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     BulkPaintColour:
 *       type: object
 *       required:
 *        - name
 *        - stockStatus
 *       properties:
 *         name:
 *           type: array
 *           items:
 *              type: string
 *         stockStatus:
 *           type: string
 */

const payload = {
  body: object({
    name: array(string({
      required_error: "Name is required",
    })),
    stockStatus: string({
      required_error: "StockStatus Name is required",
    })
  }),
};

export const updateBulkPaintColourSchema = object({
  ...payload,
});

export type UpdateBulkPaintColourInput = TypeOf<typeof updateBulkPaintColourSchema>;
