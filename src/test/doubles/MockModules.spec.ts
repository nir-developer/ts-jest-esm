//THIS FILE HAS BEEN ADDED ON DEMO OF SPY ON MODULES
//IMPORTANT:Mock entire module - with default empty implementaion provided by jest.mock()
//PROVIDE A FACTORY METHOD TO PRESERVE SOME FUNCTIONS AND CHANGE SOME FUNCTION
jest.mock("../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  //Preserve all functions exept calculateComplexity
  calculateComplexity: () => {
    return 10;
  },
  // calculateComplexity: () => 10,
}));

//PROVIDE IMPLEMENAION FOR THE v4 method OF THE BUILT IN NODE MODULE(uuid)- so I can provide it's name only
jest.mock("uuid", () => ({
  v4: () => "123",
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("module tests", () => {
  test("calculate complexity should return 10 based on my impl method!", () => {
    //PASS AN EMPTY STUB(PARTIAL StringInfo object)
    const actual = OtherUtils.calculateComplexity({} as any);
    expect(actual).toBe(10);

    //BEFORE PROVIDING MY IMPL:
    //Provide empty(EMPTY STUB - PARTIAL Object of the StringInfo)
    // const actual = OtherUtils.calculateComplexity({} as any);
    // console.log(actual);
    // expect(actual).toBeUndefined();
  });

  test("keep other functions other than toLowerCaseWithId", () => {
    const result = OtherUtils.toUpperCase("abc");
    console.log(result);
    expect(result).toBe("ABC");
  });

  test("string with id", () => {
    const actual = OtherUtils.toLowerCaseWithId("ABC");
    console.log(actual);
    expect(actual).toBe("abc123");
  });
});
