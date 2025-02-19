import { Pool } from "pg";
import request from "supertest";
import bcrypt from "bcrypt";
import { app } from "../../src/app";

const URL = "/api/v1/admin/login";

describe("Admin login tests", () => {
  // make sure tester name doesn't exist in database
  const testAddedAdminName = "superTesterUserReservedLogin";
  const testNonExistentAdminName = "superTesterUserReservedNameXXX";
  const testPassword = "12345";

  beforeAll(async () => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWD,
      user: process.env.DB_USER,
    });
    
    await pool.query(`DELETE FROM admins WHERE name = $1;`, [testAddedAdminName]);

    const hash = await bcrypt.hash(testPassword, 10);

    await pool.query(
      `
    INSERT INTO admins (name, passwd) VALUES ($1, $2);
    `,
      [testAddedAdminName, hash]
    );
  })

  it("fails on invalid request body", async () => {
    let req = await request(app).post(URL).send({ some: "garbage" });
    expect(req.headers["api-code"]).toBe("1000");
  });

  it("fails on too long name", async () => {
    let name = "";
    for (let i = 0; i < 50; ++i) name += "A";
    let req = await request(app).post(URL).send({ login: name, passwd: "123" });
    expect(req.headers["api-code"]).toBe("1001");
  });

  it("fails when name doesn't exist", async () => {
    let req = await request(app).post(URL).send({ login: testNonExistentAdminName, passwd: "123" });
    expect(req.headers["api-code"]).toBe("4000");
  });

  it("fails on wrong password", async () => {
    let req = await request(app).post(URL).send({ login: testAddedAdminName, passwd: "123" });
    expect(req.headers["api-code"]).toBe("4001");
  });

  it("correctly returns success", async () => {
    let req = await request(app).post(URL).send({ login: testAddedAdminName, passwd: testPassword});
    expect(req.headers["api-code"]).toBe("0");
  });
});
