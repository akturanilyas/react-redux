export class AuthService {
  public logout = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

  public static getToken = async () => {
    const token = await localStorage.getItem('token');

    return token;
  };

  public static setToken = async (token: string) => {
    await localStorage.setItem('token', token);
  };
}
