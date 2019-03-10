import * as bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { parseBasicAuthorization } from "../helpers/Params";
import { UsersModel } from "../models/UsersModel";

const logger = require("debug")("express-authentication");

export class AuthRouter {
    public router: Router;
    private model: UsersModel;

    constructor() {
        this.router = Router();
        this.routes();
        this.model = new UsersModel();
    }

    protected routes = () => {
        this.router.post("/", this.Login);
        this.router.delete("/", this.Logout);
    }

    // Authentication
    protected Login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Checking Authorization header
            if (!req.headers.authorization) {
                return res.status(401).send("No authorization header sent");
            }
            const [username, password] = parseBasicAuthorization(req.headers.authorization);
            const user = await this.model.GetByUsername(username);
            if (!user) {
                throw new Error("User not found.");
            }
            const compareResult = await this.model.CheckPassword(password, user.password);
            if (!compareResult) {
                throw new Error("Invalid password");
            }
            const tempUser = {
                role: user.role,
                token: "",
                username: user.username,
            };
            const token = jwt.sign(tempUser, config.SECRET, {
                algorithm: "HS512",
                expiresIn: "2 days",
            });
            tempUser.token = token;
            return res.status(200).send(tempUser);
        } catch (e) {
            logger(e);
            return res.status(401).send("Not authorized");
        }
    }

    // Logout
    protected Logout = (req: Request, res: Response, next: NextFunction) => {
        res.send("Logout route");
    }
}

export default new AuthRouter().router;
