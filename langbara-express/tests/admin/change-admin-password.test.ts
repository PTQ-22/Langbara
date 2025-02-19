import { Pool } from "pg";
import bcrypt from "bcrypt";
import request from "supertest";
import { app } from "../../src/app";

const URL = "/internal/v1/admin/change-password";

describe("Change admin password tests", () => {
  // make sure tester name doesn't exist in database
  const testAddedAdminName = "superTesterAdminReservedName";
  const testAdminOldPassword = "123";

  beforeAll(async () => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWD,
      user: process.env.DB_USER,
    });

    await pool.query(`DELETE FROM admins WHERE name = $1;`, [
      testAddedAdminName,
    ]);

    const hash = await bcrypt.hash(testAdminOldPassword, 10);
    await pool.query(
      `
    INSERT INTO admins (name, passwd) VALUES ($1, $2);
    `,
      [testAddedAdminName, hash]
    );
  });

  it("fails on invalid request body", async () => {
    let req = await request(app).post(URL).send({ name: "name" });
    expect(req.headers["api-code"]).toBe("1000");
  });

  it("fails on given unexisting admin name", async () => {
    let req = await request(app).post(URL).send({
      name: "-1",
      oldPassword: "123",
      newPassword: "123",
    });
    expect(req.headers["api-code"]).toBe("5000");
  });

  it("fails on given invalid old password", async () => {
    let req = await request(app).post(URL).send({
      name: testAddedAdminName,
      oldPassword: "13",
      newPassword: "13",
    });
    expect(req.headers["api-code"]).toBe("5001");
  });

  it("changes password on correct request", async () => {
    let req = await request(app).post(URL).send({
      name: testAddedAdminName,
      oldPassword: testAdminOldPassword,
      newPassword: "13",
    });
    expect(req.headers["api-code"]).toBe("0");
    expect(req.status).toBe(201);
  });
});
