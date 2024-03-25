import "reflect-metadata"
import { DataSource } from "typeorm"
import {PaintColour} from './models/PaintColour';
import {User} from './models/User';



export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./server.sqlite",
    synchronize: true,
    logging: false,
    entities: [PaintColour, User],
    migrations: [],
    subscribers: [],
})
