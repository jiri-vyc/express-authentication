import { NextFunction, Request, Response, Router } from "express";
import { UsersModel } from "./../models/UsersModel";

export class BaseRouter {
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

    protected GetAll = (req: Request, res: Response, next: NextFunction) => {
        res.send("Get all users route");
    }

    protected GetOne = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Not found user");
        } else {
            res.send("Found user " + req.params.id);
        }
    }

    protected DeleteOne = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Not found user");
        } else {
            res.send("Found user for deletion " + req.params.id);
        }
    }

    protected UpdateOne = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next("Not found user");
        } else {
            res.send("Found user for updating " + req.params.id);
        }
    }

    protected Create = (req: Request, res: Response, next: NextFunction) => {
        res.send("Create user route");
    }
}

export default new BaseRouter().router;
