import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
const logger = require("debug")("express-authentication");

class AuthenticationMiddleware {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(this.Authenticate);
    }

    private Authenticate = (req: Request, res: Response, next: NextFunction) => {
        // Checking Authorization header
        // Checking Authorization header
        if (!req.headers.authorization) {
            return res.status(401).send("No authorization header sent");
        }
        const pieces = (req.headers.authorization as string).split(" ", 2);
        logger(pieces);
        if (pieces.length !== 2 || pieces[0].toLowerCase() !== "basic") {
            return res.status(401).send("Wrong format of basic authentication data");
        }
        const buffer = Buffer.from(pieces[1], "base64");
        const token = buffer.toString().split(":")[0];

        logger(token);
        if (token) {
            jwt.verify(token, config.SECRET, {algorithms: ["HS512"]}, (err, decoded) => {
                if (err) {
                    logger(err);
                    return res.status(401).send("Not authenticated provided api key");
                } else {
                    logger("Authenticated");
                    return next();
                }
            });
        } else {
            logger("No authentication key provided");
            return res.status(401).send("No authentication key provided");
        }
    }
}

export default new AuthenticationMiddleware().router;
