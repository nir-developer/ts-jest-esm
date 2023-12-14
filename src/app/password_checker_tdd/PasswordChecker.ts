export class PasswordChecker {
  public checkPassword(password: string) {
    if (password.length < 8) return false;
    if (password.toLowerCase() === password) return false;
    if (password.toUpperCase() === password) return false;

    return true;
  }
}
