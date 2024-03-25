import { Factory, Seeder, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PaintColour } from '../../models/PaintColour';
import paintColours from './../paint-colours.json';

export default class CreatePaintColours implements Seeder {

    // @ts-ignore
    public async run(factory: Factory, connection:Connection): Promise<void> {

        const em = connection.createEntityManager();
        await times(5, async (n) => {
            const x = paintColours[n];
            const paintColour = new PaintColour();
            paintColour.name =  x.name;
            paintColour.stockStatus = x.stockStatus as any;
            await em.save(paintColour);
            return paintColour;
        });

    }

}
