import { http, HttpResponse } from "msw";

let isLoggedIn = false;
let userType = "patient";

export const handlers = [
  // Login endpoint
  http.post("http://localhost:5000/login", async ({ request }) => {
    const body = await request.json();
    if (body.user === "user@example.com" && body.password === "123456") {
      isLoggedIn = true;
      return HttpResponse.json({ message: "login success" }, { 
        headers: {
          "Set-Cookie": "accessToken=mocked; HttpOnly; Path=/;"
        }
      });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),

  // Logout endpoint
  http.post("http://localhost:5000/logout", () => {
    isLoggedIn = false;
    return HttpResponse.json({ message: "logout success" });
  }),

  // Refresh endpoint
  http.post("http://localhost:5000/refresh", () => {
    if (isLoggedIn) {
      return HttpResponse.json({ message: "refreshed" });
    }
    return HttpResponse.json({ message: "refresh failed" }, { status: 401 });
  }),

  // Get User endpoint
  http.get("http://localhost:5000/user/:userType", ({ params }) => {
    if (!isLoggedIn) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json({
      type: params.userType,
      name: "Mocked User",
      email: "user@example.com",
    });
  }),

  // Update User endpoint
  http.patch("http://localhost:5000/user/:userType", async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({ ...body, type: params.userType });
  }),

  // Delete User endpoint
  http.delete("http://localhost:5000/user/:userType", () => {
    isLoggedIn = false;
    return HttpResponse.json({ message: "user deleted" }, { status: 200 });
  }),
];
