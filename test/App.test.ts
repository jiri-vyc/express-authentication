import * as chai from "chai";
import { expect } from "chai";
import * as mocha from "mocha";

import { App } from "../src/App";

describe("App", () => {
    it("Should instantiate", () => {
        const app = new App();
        expect(app).not.to.be.undefined;
    });

    it("Should have start function", () => {
        const app = new App();
        expect(app.start).not.to.be.undefined;
        expect(typeof(app.start)).to.be.equal("function");
    });
});
