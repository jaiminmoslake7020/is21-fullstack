import {AppDataSource} from '../data-source';
import {PaintColour} from '../models/PaintColour';
import {Error} from '../schema/error.schema';
import {UpdatePaintColourInput} from '../schema/paintColour.schema';
import {UpdateBulkPaintColourInput} from '../schema/bulkPaintColour.schema';

const getPaintColourRepo = () => {
    return AppDataSource.getRepository(PaintColour)
}


export const getPaintColours = async ():Promise<PaintColour[]> => {
    return await getPaintColourRepo().find();
}


export const getProductByName = async (name:string): Promise<PaintColour> => {
    return await getPaintColourRepo().findOneBy({
        name
    });
}

export const updatePaintColour = async (productInput:UpdatePaintColourInput):Promise<PaintColour|Error> => {
    const { name, stockStatus } = productInput.body;
    const oldPaintColour = await getProductByName(name);
    if (!oldPaintColour) {
        return  {
            status: 404,
            message: "Paint colour not found."
        };
    }
    const paintColour = Object.assign(oldPaintColour, {
        stockStatus,
    });
    await getPaintColourRepo().save(paintColour);
    return await getProductByName(name);
}

export const bulkUpdatePaintColour = async (productInput:UpdateBulkPaintColourInput):Promise<PaintColour[]|Error> => {
    const { name, stockStatus } = productInput.body;
    await Promise.all(name.map( async (n:string) => {
        return await updatePaintColour({
            body: {
                name: n,
                stockStatus
            }
        });
    }));
    return getPaintColours();
}


