import { HttpService } from './../../services/http.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  signout(): void {
    window.localStorage.clear();
    this.http.post('/user/userLogout', {});
    this.loginService.token = '';
    this.router.navigateByUrl('/login');
  }

}
