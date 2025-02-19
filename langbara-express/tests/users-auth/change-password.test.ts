import { Pool } from "pg";
import bcrypt from "bcrypt";
import request from "supertest";
import { app } from "../../src/app";

const URL = "/internal/v1/user/change-password";

describe("Change user password tests", () => {
  // make sure tester name doesn't exist in database
  const testAddedUserID = "superTesterUserReservedName";
  const testUserOldPassword = "123";

  beforeAll(async () => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWD,
      user: process.env.DB_USER,
    });

    await pool.query(`DELETE FROM users WHERE id = $1;`, [
      testAddedUserID,
    ]);

    const hash = await bcrypt.hash(testUserOldPassword, 10);
    await pool.query(
      `
    INSERT INTO users(id, display_name, email, passwd, points, streak, data)
    VALUES ($1, $1, 'example@lanbara.pl', $2, 0, 0, '{}');
  `,
      [
        testAddedUserID,
        hash,
      ]
    );
  });

  it("fails on invalid request body", async () => {
    let req = await request(app).post(URL).send({ name: "name" });
    expect(req.headers["api-code"]).toBe("1000");
  });

  it("fails on given unexisting user id", async () => {
    let req = await request(app).post(URL).send({
      id: "-1",
      oldPassword: "123",
      newPassword: "123",
    });
    expect(req.headers["api-code"]).toBe("5000");
  });

  it("fails on given invalid old password", async () => {

    let req = await request(app).post(URL).send({
      id: testAddedUserID,
      oldPassword: "13",
      newPassword: "13",
    });
    expect(req.headers["api-code"]).toBe("5001");
  });

  it("changes password on correct request", async () => {

    let req = await request(app).post(URL).send({
      id: testAddedUserID,
      oldPassword: testUserOldPassword,
      newPassword: "13",
    });
    expect(req.headers["api-code"]).toBe("0");
    expect(req.status).toBe(201);
  });

});
