import * as chai from "chai";
import { expect } from "chai";
import * as mocha from "mocha";

import { isArray } from "util";
import { UsersModel } from "../../src/models/UsersModel";
const logger = require("debug")("express-authentication");

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
        expect(user.name).to.be.equal("Name 1");
    });

    it("Should return user by id", async () => {
        const model = new UsersModel();
        const user = await model.GetByUsername("user1");
        expect(user.name).to.be.equal("Name 1");
    });

    it("Should create new user", async () => {
        const model = new UsersModel("users-test");
        await model.CreateUser("usernameTest", "TestName", "TestUsername", "passwordTest", "user");
        const user = await model.GetByUsername("usernameTest");
        expect(user.name).to.be.equal("TestName");
    });

    it("Should delete user", async () => {
        const model = new UsersModel("users-test");
        await model.CreateUser("usernameTest2", "TestName2", "TestUsername 2 ", "passwordTest123", "user");
        await model.CreateUser("usernameTest3", "TestName3", "TestUsername 3", "passwordTest1234", "user");
        const user = await model.GetByUsername("usernameTest3");
        expect(user.name).to.be.equal("TestName3");
        await model.DeleteOne(user.id);
        const user2 = await model.GetByUsername("usernameTest3");
        expect(user2).to.be.undefined;
    });
});
