import { NextFunction, Request, Response, Router } from "express";

export class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes = () => {
        this.router.post("/", this.Login);
        this.router.delete("/", this.Logout);
    }

    protected Login = (req: Request, res: Response, next: NextFunction) => {
        res.send("Login route");
    }

    protected Logout = (req: Request, res: Response, next: NextFunction) => {
        res.send("Logout route");
    }
}

export default new BaseRouter().router;
