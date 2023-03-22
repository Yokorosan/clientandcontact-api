import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedUser,
  mockedUserAdmin,
  mockedUserDelete,
  mockedUserDeleteLogin,
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

  test("POST /users - Must be able to create a user", async () => {
    const response = await request(app)
      .post("/users/register/")
      .send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Astolfo");
    expect(response.body.email).toEqual("astolfo@phonebook.com.br");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(201);
  });

  test("POST /users - Must be able to create a user with extra field", async () => {
    const response = await request(app)
      .post("/users/register/")
      .send(mockedUserAdmin);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Mikhail");
    expect(response.body.email).toEqual("mikhail@phonebook.com.br");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /users - Must not be able to create a user that alredy exists", async () => {
    const response = await request(app)
      .post("/users/register/")
      .send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("DELETE /users - Should not be able to deactivate itself without Token", async () => {
    const register = await request(app)
      .post("/users/register/")
      .send(mockedUserDelete);

    const response = await request(app).delete(
      `/users/${register.body.id}/deactivate`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users - Should not be able to deactivate user without being itself or admin", async () => {
    const userLoginAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const adminProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    const userLoginDeleteLogin = await request(app)
      .post("/login")
      .send(mockedUserDeleteLogin);

    const response = await request(app)
      .delete(`/users/${adminProfile.body.id}/deactivate`)
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /users - Should be able to deactivate itself", async () => {
    const userLoginDeleteLogin = await request(app)
      .post("/login")
      .send(mockedUserDeleteLogin);

    const userDeleteProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    const response = await request(app)
      .delete(`/users/${userDeleteProfile.body.id}/deactivate`)
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("GET /users - Should not be able to list others without being Admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userLoginResponseAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const adminProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponseAdmin.body.token}`);

    const response = await request(app)
      .get(`/users/${adminProfile.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /users - Should be able to list any user as Admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userLoginResponseAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const userProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/users/${userProfile.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponseAdmin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Astolfo");
    expect(response.body.email).toEqual("astolfo@phonebook.com.br");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(200);
  });

  test("GET /users - Admin should be able to list all users in database", async () => {
    const userLoginResponseAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const response = await request(app)
      .get("/users/all")
      .set("Authorization", `Bearer ${userLoginResponseAdmin.body.token}`);

    expect(response.body.length).toEqual(3);
    expect(response.body[2].isActive).toEqual(false);
    expect(response.status).toBe(200);
  });

  test("PATCH /users - Should not be able to update a user without being Owner or Admin", async () => {
    const userLoginAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const adminProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .get(`/users/${adminProfile.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /users - Should be able to update user", async () => {
    const userLoginAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const adminProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    const response = await request(app)
      .patch(`/users/${adminProfile.body.id}`)
      .send({ name: "Ether Yokoro" })
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Ether Yokoro");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(true);
    expect(response.status).toBe(200);
  });

  test("PUT /users - Can't restore an alredy active user", async () => {
    const userLoginAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const adminProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    const response = await request(app)
      .put(`/users/${adminProfile.body.id}/restore`)
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PUT /users - Restore an deactivated user", async () => {
    const userLoginDeleteLogin = await request(app)
      .post("/login")
      .send(mockedUserDeleteLogin);

    const userDeleteProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    const response = await request(app)
      .put(`/users/${userDeleteProfile.body.id}/restore`)
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.deletedAt).toEqual(null);
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(200);
  });
  test("DELETE /users - shouldn't be able to delete another user", async () => {
    const userLoginAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const adminProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginAdmin.body.token}`);

    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .delete(`/users/${adminProfile.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /users - shouldn't be able to delete itself", async () => {
    const userLoginDeleteLogin = await request(app)
      .post("/login")
      .send(mockedUserDeleteLogin);

    const userDeleteProfile = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    const responseDelete = await request(app)
      .delete(`/users/${userDeleteProfile.body.id}`)
      .set("Authorization", `Bearer ${userLoginDeleteLogin.body.token}`);

    const userLoginResponseAdmin = await request(app)
      .post("/login")
      .send(mockedUserAdmin);

    const response = await request(app)
      .get("/users/all")
      .set("Authorization", `Bearer ${userLoginResponseAdmin.body.token}`);

    expect(response.body.length).toEqual(2);
    expect(responseDelete.status).toBe(204);
  });
});
