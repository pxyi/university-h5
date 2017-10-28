import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class LoginGuard implements CanActivate{

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(): boolean{
    if(!this.loginService.token || this.loginService.token.length <= 0){
      this.router.navigateByUrl('/login');
    }
    return this.loginService.token.length > 0;
  }

}