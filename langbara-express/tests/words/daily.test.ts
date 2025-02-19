import request from "supertest";
import { app } from "../../src/app";

const URL = "/internal/v1/words";

let req: any;

describe("Generate daily tests", () => {
  beforeAll(async () => {
    req = await request(app)
      .get(URL + "/new-daily")
      .send();
  });

  it("responds with message", () => {
    expect(req.body).toHaveProperty("msg");
  });
  it("returns word", () => {
    expect(req.body).toHaveProperty("word");
  });
  it("returns defintion", () => {
    expect(req.body.word.definition).not.toBe("Undefined");
  });
});
