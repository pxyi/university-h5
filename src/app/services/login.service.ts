import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  public token: string = '';
  public userId: string;

  constructor(
  ) {
    this.token = window.localStorage.getItem('token') || '';
    this.userId = window.localStorage.getItem('userId') || '';
  }

}
