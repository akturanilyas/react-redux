import { AxiosResponse } from 'axios';
import { urlConstant } from '../constants/urlConstant';
import { actionTypes } from '../enums/actionType';
import { ApiService } from './api';

export class AuthService {
  private apiService = new ApiService();

  public async login(username: string, password: string) {
    const response: AxiosResponse | undefined = await this.apiService.start(actionTypes.POST, urlConstant.LOGIN, {
      username,
      password,
    });

    if (200 === response?.status) {
      await this.setToken(response.data.token);
      window.location.href = '/';
    }

    return response;
  }

  public async signUp(first_name: string, last_name: string, email: string, username: string, password: string) {
    const response: AxiosResponse | undefined = await this.apiService.start(actionTypes.POST, urlConstant.SIGN_UP, {
      first_name,
      last_name,
      username,
      email,
      password,
    });

    return response;
  }

  public logout = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

  public getToken = async () => {
    await localStorage.getItem('auth-token');
  };

  public setToken = async (token: string) => {
    await localStorage.setItem('auth-token', token);
  };
}
