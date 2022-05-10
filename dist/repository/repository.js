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
exports.renameUser = exports.addUser = exports.deleteUser = exports.getBaseUserId = exports.getUser = exports.getUsers = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId },
    creatData: Date,
    secondName: String,
});
const Users = (0, mongoose_1.model)('MyUsers', userSchema);
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users.find();
    return users.map(({ userId, name, secondName, creatData }) => ({
        userId,
        name,
        creatData,
        secondName,
    }));
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = yield (0, exports.getBaseUserId)(id);
    return Users.findById(UserId);
});
exports.getUser = getUser;
const getBaseUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users.findOne({ userId });
    if (user) {
        return user._id;
    }
    throw new Error('user not found');
});
exports.getBaseUserId = getBaseUserId;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = yield (0, exports.getBaseUserId)(id);
    return Users.findByIdAndDelete(UserId);
});
exports.deleteUser = deleteUser;
const addUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.Types.ObjectId();
    const creatData = new Date();
    return Users.create({ name, userId, creatData });
});
exports.addUser = addUser;
const renameUser = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield (0, exports.getBaseUserId)(id);
    if (userId) {
        return Users.findByIdAndUpdate(userId, { name });
    }
    throw new Error('user not found');
});
exports.renameUser = renameUser;
