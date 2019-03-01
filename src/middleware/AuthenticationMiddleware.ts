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
        const token = req.headers["x-api-key"] as string;
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
