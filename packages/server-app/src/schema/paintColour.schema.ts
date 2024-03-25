import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     PaintColours:
 *       type: object
 *       required:
 *        - name
 *        - stockStatus
 *       properties:
 *         name:
 *           type: string
 *         stockStatus:
 *           type: string
 */

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    stockStatus: string({
      required_error: "StockStatus Name is required",
    })
  }),
};

export const updatePaintColourSchema = object({
  ...payload,
});

export type UpdatePaintColourInput = TypeOf<typeof updatePaintColourSchema>;
