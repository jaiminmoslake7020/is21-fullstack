"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const data_source_1 = require("./data-source");
const paintColoursRoutes_1 = tslib_1.__importDefault(require("./routes/paintColoursRoutes"));
const swagger_1 = tslib_1.__importDefault(require("./utils/swagger"));
const userRoutes_1 = tslib_1.__importDefault(require("./routes/userRoutes"));
const cors_1 = tslib_1.__importDefault(require("cors"));
data_source_1.AppDataSource.initialize().then(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    // setup express app here
    // ...
    const port = 3000;
    // start express server
    app.listen(port, () => {
        (0, paintColoursRoutes_1.default)(app);
        (0, userRoutes_1.default)(app);
        (0, swagger_1.default)(app, port);
    });
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map