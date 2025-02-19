import { Pool } from "pg";
import request from "supertest";
import { app } from "../../src/app";

const URL = "/api/v1/admin/register";

describe("Admin register tests", () => {
  // make sure tester name doesn't exist in database
  const testAddedAdminName = "superTesterUserReservedName";

  beforeAll(async () => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWD,
      user: process.env.DB_USER,
    });

    await pool.query(`DELETE FROM admins WHERE name = $1;`, [testAddedAdminName]);
  })

  it("fails on invalid request body", async () => {
    let req = await request(app).post(URL).send({ name: "name" });
    expect(req.headers["api-code"]).toBe("1000");
  });

  it("fails on too long name", async () => {
    let name = "";
    for (let i = 0; i < 50; ++i) name += "A";
    let req = await request(app).post(URL).send({ name, password: "123" });
    expect(req.headers["api-code"]).toBe("1001");
  });

  it("fails when name already in database", async () => {
    let name = "tester";
    await request(app).post(URL).send({ name, password: "123" });
    let req = await request(app).post(URL).send({ name, password: "123" });
    expect(req.headers["api-code"]).toBe("2000");
  });

  it("adds new admin to database", async () => {
    const name = testAddedAdminName;
    let req = await request(app).post(URL).send({ name, password: "123" });
    expect(req.headers["api-code"]).toBe("0");
    expect(req.status).toBe(201);
  });
});
