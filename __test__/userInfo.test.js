const request = require("supertest");
const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
const initBossData = require("./initBossData");

/**
 * @Todo 기록이 있는 유저에 대한 정상 게임 기록 테스트
 */
describe("==== 유저 조회 | POST /user ====", () => {
  before(async () => {
    await initBossData();
  });

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

  it("보스레이드 정상 종료", (done) => {
    request(app)
      .patch("/bossRaid/end")
      .send({
        userId,
        raidRecordId,
      })
      .expect(201, done);
  });

  it("유저 기록 조회", (done) => {
    request(app).get(`/user/${userId}`).send().expect(200, done);
  });
});
