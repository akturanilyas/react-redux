export class AuthService {
  public logout = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

  public getToken = async () => {
    const token = await localStorage.getItem('token');

    return token;
  };

  public setToken = async (token: string) => {
    await localStorage.setItem('token', token);
  };
}
