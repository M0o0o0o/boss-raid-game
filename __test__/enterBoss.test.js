const request = require("supertest");
const chai = require("chai");
const app = require("../app");
const expect = chai.expect;
const { v4: uuidv4 } = require("uuid");
const initBossData = require("./initBossData");

describe("==== enter boss room | POST /bossRaid/enter ====", async () => {
  before(async () => {
    await initBossData();
  });

  it("존재하지 않는 userId로 시도", (done) => {
    request(app)
      .post("/bossRaid/enter")
      .send({
        userId: uuidv4(),
        level: 3,
      })
      .expect(400, done);
  });

  /**
   * 테스트를 위한 유저 생성
   */
  let userId = null;
  it("유저 생성 1", (done) => {
    request(app)
      .post("/user")
      .send()
      .expect((res) => {
        userId = res.body.userId;
      })
      .expect(201, done);
  });

  it("존재하지 않는 level로 시도", (done) => {
    request(app)
      .post("/bossRaid/enter")
      .send({
        userId,
        level: 4,
      })
      .expect(400, done);
  });

  it("정상 보스 레이드 입장", (done) => {
    request(app)
      .post("/bossRaid/enter")
      .send({
        userId,
        level: 3,
      })
      .expect((res) => {
        expect(res.body).to.have.own.property("isEntered");
        expect(res.body).to.have.own.property("raidRecordId");
        expect(res.body.isEntered).to.equal(true);
      })
      .expect(201, done);
  });
});
