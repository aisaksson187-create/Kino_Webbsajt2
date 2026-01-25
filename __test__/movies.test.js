import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";


jest.unstable_mockModule("../src2/api2.js", () => ({
  getMovies: async () => ([
    { id: 1, attributes: { title: "Test Movie 1" } },
    { id: 2, attributes: { title: "Test Movie 2" } }
  ]),
  getMovie: async (id) => ({
    id: Number(id),
    title: "Test Movie 1",
    intro: "Intro",
    image: { url: "https://example.com/poster.jpg" }
  })
}));


const { app } = await import("../app.js");

describe("Movies list page", () => {
  test("renders a list of movies", async () => {
    const res = await request(app).get("/movies");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);

    expect(res.text).toContain("Test Movie 1");
    expect(res.text).toContain("Test Movie 2");
  });
});
