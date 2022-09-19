const request = require("supertest");
const chai = require("chai");
const app = require("../app");
const expect = chai.expect;
const { v4: uuidv4 } = require("uuid");
const initBossData = require("./initBossData");

describe("=== end boss room | PATCH /bossRaid/end ====", async () => {
  before(async () => {
    await initBossData();
  });
  /**
   * 테스트를 위한 유저 생성
   */
  let userId = null;
  let raidRecordId = null;

  it("유저 생성 1", (done) => {
    request(app)
      .post("/user")
      .send()
      .expect((res) => {
        userId = res.body.userId;
      })
      .expect(201, done);
  });

  it("정상 보스 레이드 입장", (done) => {
    request(app)
      .post("/bossRaid/enter")
      .send({
        userId,
        level: 3,
      })
      .expect((res) => {
        raidRecordId = res.body.raidRecordId;
        expect(res.body).to.have.own.property("isEntered");
        expect(res.body).to.have.own.property("raidRecordId");
        expect(res.body.isEntered).to.equal(true);
      })
      .expect(201, done);
  });

  it("보스레이드 종료 요청 with wrong userId", (done) => {
    request(app)
      .patch("/bossRaid/end")
      .send({
        userId: uuidv4(),
        raidRecordId,
      })
      .expect(400, done);
  });

  it("보스레이드 종료 요청 with wrong raidRecordId", (done) => {
    request(app)
      .patch("/bossRaid/end")
      .send({
        userId,
        raidRecordId: uuidv4(),
      })
      .expect(400, done);
  });

  it("보스레이드 정상 종료", (done) => {
    request(app)
      .patch("/bossRaid/end")
      .send({
        userId,
        raidRecordId,
      })
      .expect(201, done);
  });
});
