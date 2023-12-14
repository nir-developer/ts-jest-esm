import { PasswordChecker } from "../../app/password_checker_tdd/PasswordChecker";
describe("PasswordChecker Project", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  //ITER 1 - REQUIREMENT 1
  it("Password with less than 8 chars is invalid", () => {
    const testPassword = "1234567";

    expect(sut.checkPassword(testPassword)).toBe(false);
  });

  it("Password with at least 8 chars is valid", () => {
    //Changed for requirement 2 for uppercase!! bad
    //const testPassword = "12345678";
    //const testPassword = "AAAA11111";
    //CHANGE FOR ITER 1 - REQUIRE 3
    const testPassword = "abcA1234";

    expect(sut.checkPassword(testPassword)).toBe(true);
  });

  //ITER 1 - REQUIREMENT 2
  it("Password with no uppercase is invalid", () => {
    const testPassword = "ab778787878";

    expect(sut.checkPassword(testPassword)).toBe(false);
  });

  it("Password with uppercase is valid", () => {
    //CHANGE FOR ITER 1 - REQUIRE 3
    // const testPassword = "A1111111";
    const testPassword = "A111111a";

    expect(sut.checkPassword(testPassword)).toBe(true);
  });

  //ITER 1 - REQUIREMENT 3
  it("Password without lower is invalid", () => {
    const testPassword = "A1111111";

    expect(sut.checkPassword(testPassword)).toBe(false);
  });
});
