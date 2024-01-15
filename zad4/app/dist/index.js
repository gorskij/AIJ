"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("./config/app-data-source");
const routes_1 = __importDefault(require("./routes"));
// import { runSeeder } from 'typeorm-seeding';
// import CategorySeeder from './seeders/main.seeder';
const category_entity_1 = require("./entities/category.entity");
app_data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const categoriesRepository = app_data_source_1.AppDataSource.getRepository(category_entity_1.Category);
const category1 = new category_entity_1.Category();
category1.name = 'Category 1';
categoriesRepository.save(category1);
const category2 = new category_entity_1.Category();
category2.name = 'Category 2';
categoriesRepository.save(category2);
const category3 = new category_entity_1.Category();
category3.name = 'Category 3';
categoriesRepository.save(category3);
app.use('/', routes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
