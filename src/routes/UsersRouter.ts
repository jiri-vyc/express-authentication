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
        this.router.put("/:id", this.UpdateOne);
        this.router.delete("/:id", this.DeleteOne);
    }

    // Get all users
    protected GetAll = (req: Request, res: Response, next: NextFunction) => {
        res.send(this.model.GetAll());
    }

    // Get user by ID
    protected GetOne = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Id not specified");
        } else {
            res.send(this.model.GetOne(req.params.id));
        }
    }

    // Delete user
    protected DeleteOne = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Not found user");
        } else {
            res.send("Found user for deletion " + req.params.id);
        }
    }

    // Update user
    protected UpdateOne = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Not found user");
        } else {
            res.send("Found user for updating " + req.params.id);
        }
    }

    // Registration
    protected Create = (req: Request, res: Response, next: NextFunction) => {
        res.send("Create user route");
    }
}

export default new UsersRouter().router;
