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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const enum_1 = require("../enum");
const repository_1 = require("../repository");
exports.usersRoutes = (0, express_1.Router)();
exports.usersRoutes.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
exports.usersRoutes.get(enum_1.Path.Root, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, repository_1.getUsers)();
    res.send(users);
}));
exports.usersRoutes.get(enum_1.Path.UserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield (0, repository_1.getUser)(userId);
    if (user) {
        res.send(user);
        console.log('users ok');
    }
    else {
        res.sendStatus(404);
        console.log('users error');
    }
}));
exports.usersRoutes.post(enum_1.Path.Root, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    yield (0, repository_1.addUser)(name);
    res.send({ success: true });
}));
exports.usersRoutes.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    yield (0, repository_1.deleteUser)(userId);
    res.send({ success: true });
}));
exports.usersRoutes.put(enum_1.Path.Root, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    try {
        yield (0, repository_1.renameUser)(id, name);
        res.status(200).send({ success: true });
    }
    catch (error) {
        const { message } = error;
        res.status(500).send({ error: message });
    }
}));
