import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
const logger = require("debug")("express-authentication");

class AuthenticationMiddleware {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(this.Authenticate);
    }

    private Authenticate = (req: Request, res: Response, next: NextFunction) => {
        logger("authenticated");
        return next();
    }
}

export default new AuthenticationMiddleware().router;
