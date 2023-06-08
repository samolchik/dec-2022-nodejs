"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const configs_1 = require("./configs");
const errors_1 = require("./errors");
const models_1 = require("./models");
const validators_1 = require("./validators");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", async (req, res) => {
    try {
        const users = await models_1.User.find().select("-password");
        return res.json(users);
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/users", async (req, res, next) => {
    try {
        const { error, value } = validators_1.UserValidator.create.validate(req.body);
        if (error) {
            throw new errors_1.ApiError(error.message, 400);
        }
        const createdUser = await models_1.User.create(value);
        return res.status(201).json(createdUser);
    }
    catch (e) {
        next(e);
    }
});
app.get("/users/:id", async (req, res) => {
    try {
        const user = await models_1.User.findById(req.params.id);
        return res.json(user);
    }
    catch (e) {
        console.log(e);
    }
});
app.put("/users/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error, value } = validators_1.UserValidator.update.validate(req.body);
        if (error) {
            throw new errors_1.ApiError(error.message, 400);
        }
        const updatedUser = await models_1.User.findOneAndUpdate({ _id: id }, { ...value }, { returnDocument: "after" });
        return res.status(200).json(updatedUser);
    }
    catch (e) {
        next(e);
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await models_1.User.deleteOne({ _id: id });
        return res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
    }
});
app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json(error.message);
});
app.listen(configs_1.configs.PORT, () => {
    mongoose.connect(configs_1.configs.DB_URL);
    console.log(`Server has started on PORT ${configs_1.configs.PORT} 🥸`);
});
