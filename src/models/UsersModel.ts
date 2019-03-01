import * as fs from "fs";
const logger = require("debug")("express-authentication");

export class UsersModel {
    private storage: any = [
        {username: "user1", name: "Placeholder 1", surname: "Surnameholder 1", password: "pass1", role: "admin"},
        {username: "user2", name: "Placeholder 2", surname: "Surnameholder 2", password: "pass2", role: "user"},
        {username: "user3", name: "Placeholder 3", surname: "Surnameholder 3", password: "pass3", role: "user"},
    ];

    // Placeholder
    public GetOne = (id: number) => {
        return this.storage[id];
    }

    public GetByUsername = async (inUsername: string) => {
        logger("Searching for username `" + inUsername + "`");
        const user = this.storage.find((elem: any) => elem.username === inUsername);
        logger("Found");
        logger(user);
        return user;
    }

    // Placeholder
    public GetAll = () => {
        return this.storage;
    }

    // Placeholder
    public DeleteOne = (id: number) => {
        if (id === 1 || id === 2) {
            return id;
        } else {
            return -1;
        }
    }
}
