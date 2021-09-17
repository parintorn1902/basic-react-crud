class AuthManager {
  static isLogin(): boolean {
    let checkToken = localStorage.getItem("@token");
    return checkToken ? true : false;
  }

  static saveToken(token: string) {
    localStorage.setItem("@token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("@token");
  }

  static destroyToken() {
    localStorage.removeItem("@token");
  }
}

export default AuthManager;
