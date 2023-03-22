import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { app } from "../../../app";
import request from "supertest";
import {
  mockedContact,
  mockedUser,
  mockedUserAdmin,
  mockedUserAdminLogin,
  mockedUserLogin,
} from "../../mocks";

describe("/users", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source Initialization", err);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contact - can register a contact", async () => {
    await request(app).post("/users/register/").send(mockedUser);

    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post("/contacts")
      .send(mockedContact)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("Chandra");
    expect(response.body.email).toEqual("chandra@phonebook.com.br");
    expect(response.body.phone).toEqual("(18)88888-8888");
    expect(response.status).toBe(201);
  });

  test("PATCH /contact - can edit a contact", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const userProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/contacts/${userProfile.body.contacts[0].id}`)
      .send({ name: "Chandra Revine" })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("Chandra Revine");
    expect(response.body.email).toEqual("chandra@phonebook.com.br");
    expect(response.body.phone).toEqual("(18)88888-8888");
    expect(response.status).toBe(200);
  });

  test("GET /contact - Can list one contact", async () => {
    await request(app).post("/users/register/").send(mockedUserAdmin);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const userProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .get(`/contacts/${userProfile.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("Chandra Revine");
    expect(response.status).toBe(200);
  });

  test("GET /contact - only owner can access contacts", async () => {
    await request(app).post("/users/register/").send(mockedUserAdmin);

    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const adminLogin = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const userProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .get(`/contacts/${userProfile.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /contact - can't delete another person contact", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const adminLogin = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const userProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/contacts/${userProfile.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /contact - can delete a contact", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const userProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/contacts/${userProfile.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
