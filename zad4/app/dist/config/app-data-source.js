"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    username: 'user',
    host: 'localhost',
    database: 'ajidb',
    password: 'password',
    port: 5432,
    synchronize: true,
    logging: true,
    entities: ["../entities/**/*.ts"]
});
