import {
  calculateComplexity,
  toUpperCaseWithCb,
  OtherStringUtils,
  //LoggerServiceCallBack
} from "../../app/doubles/OtherUtils";

describe.skip("OtherUtils", () => {
  ///////////////////////////
  //1)STUB DEMO!
  it("calculateComplexity", () => {
    //Create the stub (partial stringIfno)
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    };
    const expected = 10;

    //ACT
    //IMPORTANT!! T.S COMPILATION ERROR!Get rid of the
    //type checking by casting: someInfo as any
    const actual = calculateComplexity(someInfo as any);

    //ASSERT
    expect(actual).toBe(expected);
  });

  /////////////////////////////////
  //2.FAKE DEMO
  it("toUpperCaseWithCb - calls callback for Invalid argument", () => {
    //T.S : I CAN PASS ANY C.B I WANT - TYPE CHECKING DOES NOT APPLY!
    const actual = toUpperCaseWithCb("", () => {});

    //ASSERT
    expect(actual).toBeUndefined();
  });

  it("toUpperCaseWithCb - calls callback for valid argument", () => {
    //T.S : I CAN PASS ANY C.B I WANT - TYPE CHECKING DOES NOT APPLY!
    const actual = toUpperCaseWithCb("abc", () => {});

    //ASSERT
    expect(actual).toBe("ABC");
  });

  ////////////////////////////
  //3.a MOCKS (MY CUSTOM MOCK)
  describe("Tracking Callback - My Custom Mock", () => {
    //Global Tracking Initial Setup
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    //CLEAR THE GLOBAL MOCK SETUP AFTER EACH IT
    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it("calls callback for invalid argument - my custom mock - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);

      expect(actual).toBeUndefined();
      //TRACKING FUNCTIONLAITY OF THE MOCK
      expect(cbArgs).toContain("Invalid argument");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - my custom mock -track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      //const expected = "Called function with abc";

      expect(actual).toBeDefined();
      expect(actual).toBe("ABC");

      //TRACKING FUNCTIONLAITY OF THE MOCK
      expect(cbArgs).toContain("Called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  /////////////////////////////////////
  //3.b ) JEST MOCK
  describe("JEST Mock", () => {
    //Get the Mock Function From JEST - INSTEAD OF ME CREATEING IT!
    const callBackMock = jest.fn();

    //CLEAR THE MOCK FIELDS!
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - JEST - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledTimes(1);
      expect(callBackMock).toHaveBeenCalledWith("Invalid argument");
    });
    it("calls callback for valid argument - JEST - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);

      //ASSERT
      expect(actual).toBe("ABC");
      //TRACKING CALLS WITH JEST
      expect(callBackMock).toHaveBeenCalledTimes(1);
      expect(callBackMock).toHaveBeenCalledWith("Called function with abc");
    });
  });

  //////////////////////////
  //4.Spies
  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });
    //DIDATIC APPROACH
    it("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      //I DONT CARE ABOUT THE ARG FOR NOW
      sut.toUpperCase("asa");

      //I DONT CARE IN THIS TEST ABOUT THE ACTUAL VALUE RETUREND FROM THE SUT!
      expect(toUpperCaseSpy).toHaveBeenCalledWith("asa");
    });

    it("Use a spy to track calls to other MODULE", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");

      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
    });

    it("Use a spy to track calls to other MODULE", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");

      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
    });

    //DOES NOT WORK!!!!!!!
    it.skip("Use a spy to replace implementaion of a method(private/public) of an object", () => {
      jest
        .spyOn(sut as any, "callExteranlService")
        .mockImplementation(() =>
          console.log("calling mocked implementaion!!!!"),
        );

      (sut as any).callExternalService();
    });
  });
});

/**SUMMARY - TEST DOUBLES - IMPORTANT!!
  
  TEST DOUBLES
   1. SUTBS:Incomplete objects used as arguments
   2. FAKES: Simplifing WORKING implementaion - take a shortcut
   3. Mocks: Programmed with EXPECTAIONS
   4. Spies
      4.1 On Object method: (DOES NOT WORK :CHECK AGAIN HOW TO USE SPY TO CHANGE PRIVATE METHOD IMPLEMENTAINO OF AN OBJECT!!)
      4.2 On Module
  
   




 **************************************************
 * 1.STUB DEMO:OK
 * ******************************************
       Create the function: calculateComplexity(stringInfo):number
       returns #properties of stringInfo  length
 
       SOLUTION:
           Since this function uses only 2 properties
           of the 5  properties of the  StringInfo
           I can pass a STUB object that contains only length and extraInfo
 
 
 
    NOTE: dont use stub inside assertion!?!?
           They are just helper objects to tests
 
 * *******************************************
 *          2.FAKES DEMO:
 * ********************************************
    Create the function: 
    toUpperCaseWithCb(arg:string, callBack:Function):string 
 
      Before returnining the upper case -it  calls some Login Service in the background
  
 * *********************************************
 *     3. MOCKS - DEMO
 * *********************************************
    1. INSTEAD OF PASSING AN EMPTY C.B (LIKE WITH FAKE - ()=>{}) 
       I will pass my mockm that has tracking functionality 
 
    2. The Mock is injected directlry to the SUT!:
        
            const actual = toUpperCaseWithCb("", callBackMock);

    3. Original Functionality (of the c.b) IS NOT PRESERVED!



********************************************************
        4. Spies
******************************************************
     
- Original Functionality (of the c.b) IS NOT PRESERVED!
- Spies are not DIRECTLRY INTO SUT
- Usually tracks METHOD CALLS(of object)

- TRACK METHODS OF EXTERNAL MODULES! Like the log method of the console object 
  (LIKE - of the console module )

 DOES NOT WORK!!!
- CHANGE THE IMPLEMENTAION OF A CERTAIN METHOD(method of an object)
   - Since the method can be slow - API.. 
   (LIKE THE private callExternalService() method ! )

******************************************************
    4.2 SPYIS ON MODULE (UUID v4 function )
******************************************************

  - jext.mock('module path) 
      - Should be declare on top of the file(if not hoisted)
      -  provide default empty impl for all functions

  - How to preserve some methods of the module - instead of default empty impl(1)?
    
      BY PROVIDING AN ARROW FACTORY FUNCTION !NOTE THE SYNTAX ({})
      - the nested {} are for an object
    - jest.moci('path module', ()=>({})


    
    
 * ----------------------
 * T.S :
 * ---------------------- 
   1. Type checking for a c.b function has not type check !
      EXAMPLE;  
        export function toUpperCaseWithCb(
         arg: string,
         callBack: LoggerServiceCallBack,
        ): string 

      DOES NOT REACH TO THE TEST !
     I CAN PASS ANY IMPLEMENTAION FOR THE callBack !
     ()=>{}
 
 
  2. Changing Private Method implementaion - HUCK - 
      NOTE: dont call private methods in a test - indeicates a problem in impl
  
 
 
 */
