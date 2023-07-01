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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const mongoose = __importStar(require("mongoose"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const configs_1 = require("./configs");
const crons_1 = require("./crons");
const routers_1 = require("./routers");
const swaggerJson = __importStar(require("./utils/swagger.json"));
const app = (0, express_1.default)();
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
});
app.use("*", apiLimiter);
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
        "Authorization",
        "Content-Type",
        "Origin",
        "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)());
app.use("/users", routers_1.userRouter);
app.use("/auth", routers_1.authRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        message: err.message,
        status: err.status,
    });
});
app.listen(configs_1.configs.PORT, async () => {
    await mongoose.connect(configs_1.configs.DB_URL);
    (0, crons_1.cronRunner)();
    console.log(`Server has started on PORT ${configs_1.configs.PORT} 🥸`);
});
