//WHEN USING SPY TO MOCK A METHOD OF AN EXTERNAL MODULE!
import { v4 } from "uuid";
export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

//NOTE T.S - Create a type of function that takes a string and return void
export type LoggerServiceCallBack = (arg: string) => void;

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

///ADDED on the demo of spy on module method
//NOTE: Types are Optional Or mandattor?
//when install the uuid - also intall the TYPES for
// this library as dev depdency (optional)
export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}

/**1) Tested with STUBS
 * Returns stringInfo.length * stringInfo.extraInfo #keys
 */
//
//
export function calculateComplexity(stringInfo: stringInfo) {
  return stringInfo.length * Object.keys(stringInfo.extraInfo).length;
}

/**2)Tested with Fakes:SUMMARY
 * 1.the LoggerServiceCallBack can something complex in the background
 *  SO IN THE TEST I CAN PASS INSTEAD A FAKE IMPLEMENTAION
 *  SIMPLE IMPLEMENTATION!
 *
 * 2. T.S - I CAN PASS A C.B of ()=>{}
 * EVEN IF THE LoggerServiceCallBack WAS DEFINED AS
 * arg:string => void
 *
 *
 * 3.THE LIMITAION OF FAKES!
 *  Code Coverage: 100% ! BUT THIS IS NOT CORRECT!
 * SINCE IT DOES NOT COVER THE C.B I PASSED IN - IT DOES NOT
 * CHECK IF IT WAS EXECUTED! AND WITHOUT PARAMATER AND WHAT IT RETURNED...
 *
 * => I NEED A MORE COMPLEX FAKE OBJECT -I NEED A MOCK! - NEXT
 *
 */

// export function toUpperCaseWithCb(arg: string, callBack: Function): string {
export function toUpperCaseWithCb(
  arg: string,
  callBack: LoggerServiceCallBack,
): string {
  if (!arg) {
    //Compilation Error - OK -
    //callBack({});
    callBack("Invalid argument");
    //IT RETURNS UNDEFINED IMPLCITLY!
    return;
  }
  callBack(`Called function with ${arg}`);
  return arg.toUpperCase();
}

//THIS CLASS HAS BEEN CREATED FOR THE SPY DEMO!
export class OtherStringUtils {
  //This private method was created in the demo of using spy to
  //change the impl of a certain method of an object
  private callExternalService() {
    console.log("Calling external service!!!");
  }

  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  //I will have an it with spy on the log method of the console!
  public logString(arg: string) {
    console.log(arg);
  }
}
