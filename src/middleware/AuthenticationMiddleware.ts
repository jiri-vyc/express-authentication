import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { parseBasicAuthorization } from "../helpers/Params";
const logger = require("debug")("express-authentication");

class AuthenticationMiddleware {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(this.Authenticate);
    }

    private Authenticate = (req: Request, res: Response, next: NextFunction) => {
        // Checking Authorization header
        if (!req.headers.authorization) {
            return res.status(401).send("No authorization header sent.");
        }
        try {
            // Authorization: Basic {username}:{password}, in this case, get JWT token from {username}
            const token = parseBasicAuthorization(req.headers.authorization)[0];
            if (!token) {
                logger("No authentication key provided");
                return res.status(401).send("No authentication key provided");
            }
            jwt.verify(token, config.SECRET, {algorithms: ["HS512"]}, (err, decoded) => {
                if (err) {
                    logger(err);
                    return res.status(401).send("Not authenticated provided api key");
                } else {
                    logger("Authenticated");
                    return next();
                }
            });
        } catch (e) {
            logger(e);
            return res.status(400).send("Wrong format of authorization header.");
        }
    }
}

export default new AuthenticationMiddleware().router;
