const request = require("supertest");
const chai = require("chai");
const app = require("../app");
const expect = chai.expect;

describe("==== check boss state | GET /bossRaid ====", () => {
  it("보스방 확인", (done) => {
    request(app)
      .get("/bossRaid")
      .send()
      .expect((res) => {
        console.log(res.body);
        expect(res.body).to.have.own.property("canEnter");
        expect(res.body).to.have.own.property("enteredUserId");
      })
      .expect(200, done);
  });
});
