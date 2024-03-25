import { Request, Response } from "express"
import {bulkUpdatePaintColour, getPaintColours, updatePaintColour} from '../services/paint-colour';
import {UpdatePaintColourInput} from '../schema/paintColour.schema';
import {UpdateBulkPaintColourInput} from '../schema/bulkPaintColour.schema';

export const listPaintColours = async(request: Request, response: Response)=> {
    try{
        const paintColours = await getPaintColours();
        return response.json(paintColours);
    } catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to list paint colours."
        });
    }
}

export const updatePaintColourHandler = async(request: Request<{},{}, UpdatePaintColourInput['body']>, response: Response) => {
    try{
        return response.json(await updatePaintColour(request));
    } catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to update paint colour."
        });
    }
}

export const bulkUpdatePaintColourHandler = async(request: Request<{},{}, UpdateBulkPaintColourInput['body']>, response: Response) => {
    try{
        return response.json(await bulkUpdatePaintColour(request));
    } catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to bulk update paint colour."
        });
    }
}

