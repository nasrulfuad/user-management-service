import { app } from "./app";
import request from "supertest";

describe("App", () => {
  describe("/user/register", () => {
    it.todo("should create a new user");
    it.todo("should failed to create a new user when bad request");
  });
  describe("/user/list", () => {
    it.todo("should retrieve user list");
    it.todo("should retrieve user list with query params");
  });
});
