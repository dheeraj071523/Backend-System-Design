import * as chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import app from "../app.js"; // Ensure correct path

// Configure chai to use chaiHttp
chai.use(chaiHttp);

describe("Authentication", () => {
  let token;

  before(async () => {
    // Register a new user before tests
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });

    chai.expect(res.status).to.equal(200);
    token = res.body.token;
  });

  it("should log in an existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.have.property("token");
  });
});
