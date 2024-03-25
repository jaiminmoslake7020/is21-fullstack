"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const PaintColour_1 = require("./models/PaintColour");
const User_1 = require("./models/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./server.sqlite",
    synchronize: true,
    logging: false,
    entities: [PaintColour_1.PaintColour, User_1.User],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source-cli.js.map