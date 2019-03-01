import * as fs from "fs";

export class UsersModel {
    private storage: any;

    // Placeholder
    public GetOne = (id: number) => {
        return {name: "Placeholder", surname: "Surnameholder"};
    }

    // Placeholder
    public GetAll = () => {
        return [{name: "Placeholder", surname: "Surnameholder"}, {name: "Placeholder", surname: "Surnameholder"}];
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
