"use strict";

const logger = require("debug")("express-authentication");
import * as express from "express";
import { NextFunction, Request, Response, Router } from "express";
import * as http from "http";
import * as httpLogger from "morgan";

import config from "./config";
import authenticationMiddleware from "./middleware/AuthenticationMiddleware";
import authRouter from "./routes/AuthRouter";
import usersRouter from "./routes/UsersRouter";

export class App {
    private exp: express.Application;

    constructor() {
        this.exp = express();
    }

    public start = () => {
        this.middleware();
        this.routes();

        const server = http.createServer(this.exp);

        server.on("error", (e) => {
            logger(e);
        });

        const port = parseInt(config.PORT || "3001", 10);

        server.listen(port, () => {
            logger("Server is now running on port " + port);
        });
    }

    private middleware = () => {
        this.exp.use(httpLogger("combined"));
        this.exp.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Content-Type", "application/json");
            next();
        });
    }

    private routes = () => {
        this.exp.get("/", (req, res, next) => {
            res.status(200).send("Service running");
        });

        this.exp.use(authenticationMiddleware);
        this.exp.use("/users", usersRouter);
        this.exp.use("/auth", authRouter);

        this.exp.use((req, res, next) => {
            res.status(404).send("Route not found");
        });

        // Error express handler
        this.exp.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (process.env.NODE_ENV === "development") {
                res.send(err);
            } else {
                logger(err);
                res.status(500).send("Error");
            }
        });
    }
}

const app = new App().start();
