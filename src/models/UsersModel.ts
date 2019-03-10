import * as bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";
import { v4 } from "uuid";
const logger = require("debug")("express-authentication");

export class UsersModel {
    private storage: any;
    private storageName: string;

    constructor(inStorageName?: string) {
        this.storageName = inStorageName || "users";
        this.LoadDatabase();
    }

    // Placeholder
    public GetOne = async (inId: string) => {
        const user = this.storage.find((elem: any) => elem.id === inId);
        return user;
    }

    // TODO: Check for duplicity
    public CreateUser = async ( inUsername: string,
                                inName: string,
                                inSurname: string,
                                inPassword: string,
                                inRole: string) => {
        const generatedId = v4();
        const user = {
            id: generatedId,
            name: inName,
            password: await this.CreatePassword(inPassword),
            role: inRole,
            surname: inSurname,
            username: inUsername,
        };
        this.SaveUserToDb(user);
        return user;
    }

    public GetByUsername = async (inUsername: string) => {
        const user = this.storage.find((elem: any) => elem.username === inUsername);
        return user;
    }

    public GetAll = () => {
        return this.storage;
    }

    public DeleteOne = async (inId: string) => {
        this.storage = this.storage.filter((elem: any, index: any, arr: any) => {
            return elem.id !== inId;
        });
        this.SyncDB();
        return;
    }

    public CheckPassword = async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    }

    protected SyncDB = () => {
        fs.writeFileSync(path.join(".", "/data/" + this.storageName + ".json"), JSON.stringify(this.storage, null, 4));
    }

    protected SaveUserToDb = (user: any) => {
        this.storage.push(user);
        this.SyncDB();
    }

    protected LoadDatabase = () => {
        if (!fs.existsSync(path.join(".", "/data/" + this.storageName + ".json"))) {
            fs.writeFileSync(path.join(".", "/data/" + this.storageName + ".json"), "[]", { encoding: "utf8" });
        }
        this.storage = JSON.parse(fs.readFileSync(path.join(".", "/data/" + this.storageName + ".json"), "utf8"));
    }

    protected CreatePassword = async (inPassword: string): Promise<string> => {
        return bcrypt.hash(inPassword, 10);
    }
}
