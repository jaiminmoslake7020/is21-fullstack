import { Express } from "express";
import {
    listPaintColours,
    updatePaintColourHandler,
    bulkUpdatePaintColourHandler
} from "../controller/PaintColourController";
import validateResource from "../middleware/validateResource";
import {
    updatePaintColourSchema
} from "../schema/paintColour.schema";
import {
    updateBulkPaintColourSchema
} from "../schema/bulkPaintColour.schema";

function paintColoursRoutes(app: Express) {

    /**
     * @openapi
     * '/api/paint-colours/':
     *  get:
     *     tags:
     *     - PaintColours
     *     summary: List all paint colours
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *             type: "array"
     *             items:
     *              $ref: '#/components/schema/PaintColours'
     *       404:
     *         description: Product not found
     */
    app.get(
        "/api/paint-colours",
        listPaintColours
    );

    /**
     * @openapi
     * '/api/paint-colours/':
     *  put:
     *     tags:
     *     - PaintColours
     *     summary: Update paint colour
     *     consumes:
     *     - "application/json"
     *     produces:
     *     - "application/json"
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *             $ref: '#/components/schema/PaintColours'
     *       404:
     *         description: Product not found
     */
    app.put(
        "/api/paint-colours",
        validateResource(updatePaintColourSchema),
        updatePaintColourHandler
    );

    /**
     * @openapi
     * '/api/paint-colours/bulk':
     *  put:
     *     tags:
     *     - PaintColoursBulk
     *     summary: Update paint colour in bulk
     *     consumes:
     *     - "application/json"
     *     produces:
     *     - "application/json"
     *     responses:
     *      200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *             type: "array"
     *             items:
     *              $ref: '#/components/schema/PaintColours'
     *       404:
     *         description: Product not found
     */
    app.put(
        "/api/paint-colours/bulk",
        validateResource(updateBulkPaintColourSchema),
        bulkUpdatePaintColourHandler
    );

}

export default paintColoursRoutes;
