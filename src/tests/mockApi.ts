// src/tests/mockApi.ts
import MockAdapter from "axios-mock-adapter";
import api from "../api/axiosClient";

export const setupMockApi = () => {
  const mock = new MockAdapter(api, { delayResponse: 500 }); // لمحاكاة التأخير

  let isLoggedIn = false;

  mock.onPost("/login").reply((config) => {
    const body = JSON.parse(config.data);
    if (body.user === "user@example.com" && body.password === "123456") {
      isLoggedIn = true;
      return [200, { message: "login success" }];
    }
    return [401, { message: "Invalid credentials" }];
  });

  mock.onPost("/logout").reply(() => {
    isLoggedIn = false;
    return [200, { message: "logout success" }];
  });

  mock.onGet(/\/user\/\w+/).reply(200, {
  type: "patient",
  name: "Mocked User",
  email: "user@example.com",
});

// Update User endpoint
mock.onPatch(/\/user\/\w+/).reply((config) => {
  const userType = config.url!.split("/").pop();
  return [200, { ...JSON.parse(config.data), type: userType }];
});

// Delete User endpoint
mock.onDelete(/\/user\/\w+/).reply(200, { message: "user deleted" });

// Login endpoint
mock.onPost("/login").reply(200, { message: "login success" });
mock.onPost("/logout").reply(200, { message: "logout success" });
mock.onPost("/refresh").reply(200, { message: "refreshed" }); // مهم لتجاوز 404