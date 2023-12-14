import { toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  it("should return uppercase", () => {
    expect(toUpperCase("abc")).toBe("ABC");
  });
});
