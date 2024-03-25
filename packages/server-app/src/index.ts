import express from "express"
import bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import paintColoursRoutes from "./routes/paintColoursRoutes";
import swaggerDocs from "./utils/swagger";
import userRoutes from './routes/userRoutes';
import cors from 'cors';

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json())

    // setup express app here
    // ...

    const port = 3000;
    // start express server
    app.listen(port, () => {
        paintColoursRoutes(app);
        userRoutes(app);
        swaggerDocs(app, port);
    });

}).catch(error => console.log(error))
