import * as chai from "chai";
import { expect } from "chai";
import * as mocha from "mocha";

import { isArray } from "util";
import { UsersModel } from "../../src/models/UsersModel";

describe("UsersModel", () => {
    it("Should instantiate", () => {
        const model = new UsersModel();
        expect(model).not.to.be.undefined;
    });

    it("Should have GetAll function", () => {
        const model = new UsersModel();
        expect(model.GetAll).not.to.be.undefined;
        expect(typeof(model.GetAll)).to.be.equal("function");
    });

    it("Should return array of users to GetAll function", () => {
        const model = new UsersModel();
        expect(isArray(model.GetAll())).to.be.true;
    });

    it("Should return user by username", async () => {
        const model = new UsersModel();
        const user = await model.GetByUsername("user1");
        expect(user.name).to.be.equal("Placeholder 1");
    });
});
