const request = require("supertest");
const app = require("../app");

describe("==== 유저 생성 | POST /user ====", () => {
  it("유저 생성 1", (done) => {
    request(app).post("/user").send().expect(201, done);
  });

  it("유저 생성 2", (done) => {
    request(app).post("/user").send().expect(201, done);
  });
});
