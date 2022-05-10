"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("./enum");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB;
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)('mongodb://' + MONGO_DB + 'myUsers');
    });
}
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const posts = [
    {
        title: 'Lorem ipsum',
        content: 'Dolor sit amet',
    },
];
const hello = [
    {
        title: 'Lorem ipsum',
        content: 'Dolor sit amet',
    },
];
app.use((0, cors_1.default)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, body_parser_1.json)());
app.use(enum_1.Path.Users, routes_1.usersRoutes);
app.get(enum_1.Path.Root, (req, res) => {
    res.send(JSON.stringify(hello));
});
app.get(enum_1.Path.Posts, (req, res) => {
    res.send(posts);
});
app.use((req, res) => {
    res.sendStatus(404);
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
