export enum PasswordErrors {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWER_CASE = "Lower case letter required!",
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    let reasons = [];
    let valid;
    if (password.length < 8) reasons.push(PasswordErrors.SHORT);
    if (password.toLowerCase() === password)
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    if (password.toUpperCase() === password)
      reasons.push(PasswordErrors.NO_LOWER_CASE);

    valid = reasons.length === 0;

    return {
      valid,
      reasons,
    };
  }

  //AFTER ITER 1 - ALL 3 REQUIREMENTS WORKED AND TESTED!
  // public checkPassword(password: string) {
  //   if (password.length < 8) return false;
  //   if (password.toLowerCase() === password) return false;
  //   if (password.toUpperCase() === password) return false;

  //   return true;
  // }
}
