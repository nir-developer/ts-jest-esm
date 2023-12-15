export enum PasswordErrors {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWER_CASE = "Lower case letter required!",
  NO_NUMBER = "No number",
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  //ITER 3 : REFACTORING - EXTRACT THE IFS TO SEPARATE METHODS
  public checkPassword(password: string): CheckResult {
    let reasons = [];
    let valid;

    this.checkLength(password, reasons);
    this.checkLowerCase(password, reasons);
    this.checkUpperCase(password, reasons);
    this.checkNumber(password, reasons);

    valid = reasons.length === 0;

    return {
      valid,
      reasons,
    };
  }

  private checkLength(password, reasons) {
    if (password.length < 8) reasons.push(PasswordErrors.SHORT);
  }

  private checkUpperCase(password, reasons) {
    if (password.toLowerCase() === password)
      reasons.push(PasswordErrors.NO_UPPER_CASE);
  }

  private checkLowerCase(password, reasons) {
    if (password.toUpperCase() === password)
      reasons.push(PasswordErrors.NO_LOWER_CASE);
  }

  /**HOW TO IMPLEMENT IT???? REGULAR EXPRESSION!!
   */
  private checkNumber(password, reasons) {
    //if (typeof +password !== "number") reasons.push(PasswordErrors.NO_NUMBER);
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }

  //AFTER ITER 2 - WORKED AND TESTED!! BEFORE STARTING ITER 3 - REFACTOR THIS CODE !!
  //EXTRACT EACH IF TO A PRIVATE FUNCTION
  // public checkPassword(password: string): CheckResult {
  //   let reasons = [];
  //   let valid;
  //   if (password.length < 8) reasons.push(PasswordErrors.SHORT);
  //   if (password.toLowerCase() === password)
  //     reasons.push(PasswordErrors.NO_UPPER_CASE);
  //   if (password.toUpperCase() === password)
  //     reasons.push(PasswordErrors.NO_LOWER_CASE);

  //   valid = reasons.length === 0;

  //   return {
  //     valid,
  //     reasons,
  //   };
  // }

  //AFTER ITER 1 - ALL 3 REQUIREMENTS WORKED AND TESTED!
  // public checkPassword(password: string) {
  //   if (password.length < 8) return false;
  //   if (password.toLowerCase() === password) return false;
  //   if (password.toUpperCase() === password) return false;

  //   return true;
  // }
}
