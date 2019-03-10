import { NextFunction, Request, Response, Router } from "express";
import { UsersModel } from "./../models/UsersModel";

const logger = require("debug")("express-authentication");

export class UsersRouter {
    public router: Router;
    public model: UsersModel;

    constructor() {
        this.router = Router();
        this.model = new UsersModel();
        this.routes();
    }

    protected routes = () => {
        this.router.get("/", this.GetAll);
        this.router.post("/", this.Create);
        this.router.get("/:id", this.GetOne);
        this.router.delete("/:id", this.DeleteOne);
    }

    // Get all users
    protected GetAll = (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send(this.model.GetAll());
    }

    // Get user by ID
    protected GetOne = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Id not specified");
        } else {
            const user = await this.model.GetOne(req.params.id);
            if (user === undefined) {
                return res.status(404).send("User doesn't exist");
            }
            res.status(200).send(user);
        }
    }

    // Delete user
    protected DeleteOne = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Missing ID parameter for deleting user.");
        }
        try {
            const user = await this.model.GetOne(req.params.id);
            if (user === undefined) {
                return res.status(404).send("User doesn't exist");
            }
            await this.model.DeleteOne(req.params.id);
            res.status(200).send("User deleted.");
        } catch (e) {
            logger(e);
            res.status(500).send("Error deleting a user");
        }
    }

    // Registration
    protected Create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.model.CreateUser(   req.body.username,
                                                        req.body.name,
                                                        req.body.surname,
                                                        req.body.password,
                                                        "user",
                                                    );
            res.status(200).send(user);
        } catch (e) {
            logger(e);
            res.status(500).send("Error creating a user");
        }
    }
}

export default new UsersRouter().router;
