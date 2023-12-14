import {
  PasswordChecker,
  PasswordErrors,
  CheckResult,
} from "../../app/password_checker_tdd/PasswordChecker";
describe("PasswordChecker Project", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  //ITER 1 - REQUIREMENT 1
  it("Password with less than 8 chars is invalid", () => {
    const testPassword = "1234567";

    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);

    console.log(actual.reasons);
    //INTERFACE HAS NO TYPE??
    console.log(typeof actual);

    //BEFORE ITER 2:  REFACTORING TO THE TYPE AND ENUM
    //expect(sut.checkPassword(testPassword)).toBe(false);
  });

  it("Password with at least 8 chars is valid", () => {
    const testPassword = "abcA1234";

    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);

    console.log(actual.reasons);
    //////ITER 1 - OK!
    //Changed for requirement 2 for uppercase!! bad
    //const testPassword = "12345678";
    //const testPassword = "AAAA11111";
    //CHANGE FOR ITER 1 - REQUIRE 3

    //expect(sut.checkPassword(testPassword)).toBe(true);
  });

  //ITER 1 - REQUIREMENT 2
  it("Password with no uppercase is invalid", () => {
    const testPassword = "ab778787878";
    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);

    console.log(actual.reasons);

    //ITER 1 - OK !
    // const testPassword = "ab778787878";
    // expect(sut.checkPassword(testPassword)).toBe(false);
  });

  it("Password with uppercase is valid", () => {
    const testPassword = "A111111a";

    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(true);

    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);

    console.log(actual.reasons);

    ///ITER 1 - OK
    //CHANGE FOR ITER 1 - REQUIRE 3
    // const testPassword = "A1111111";
    // const testPassword = "A111111a";

    // expect(sut.checkPassword(testPassword)).toBe(true);
  });

  //ITER 1 - REQUIREMENT 3
  it("Password without lower is invalid", () => {
    const testPassword = "A1111111";

    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    console.log(actual.reasons);

    //AFTER ITER 1 - OK
    // const testPassword = "A1111111";
    // expect(sut.checkPassword(testPassword)).toBe(false);
  });

  it("Complex Password is valid", () => {
    const testPassword = "23aaaABs";

    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(true);

    //expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    expect(actual.reasons).toEqual([]);

    console.log(actual.reasons);

    ///ITER 1 - OK
    //CHANGE FOR ITER 1 - REQUIRE 3
    // const testPassword = "A1111111";
    // const testPassword = "A111111a";

    // expect(sut.checkPassword(testPassword)).toBe(true);
  });

  //REQUIREMENT 3 - MUST HAVE A NUMBER(AFTER REFACTORING! REQ 1 + REQ 2 WORK)
  it("Password without a number is invalid", () => {
    const testPassword = "ssssAAAA";

    const actual = sut.checkPassword(testPassword);

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  });

  it("Password with a number is valid", () => {
    const testPassword = "23";

    const actual = sut.checkPassword(testPassword);

    //expect(actual.valid).toBe(false);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
