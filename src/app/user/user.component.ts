import { UserInfo } from './info/info.component';
import { OSStokenService } from './../services/osstoken.service';
import { LoginService } from './../services/login.service';
import { HttpService } from './../services/http.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public hasChildren: boolean;

  public userInfo: UserInfo;

  constructor(
    private router: Router,
    private http: HttpService,
    private loginService: LoginService,
    private ossToken: OSStokenService,
  ) {
    this.ossToken.getOssToken();
  }

  ngOnInit() {
    this.http.post('/collegeWare/findEmployeeInfo', {employeeId: this.loginService.userId}).then( (res: any) => {
      if(res.code == 1000) {
        this.userInfo = res.result;
      }
    })
    this.hasChildren = this.router.url.indexOf('/user/') > -1;
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hasChildren = event.url.indexOf('/user/') > -1;
      }
    });
  }

  goInfo(): void {
    this.router.navigate(['/user/info', JSON.stringify(this.userInfo)]);
  }


  async upfile(file) {
    let res = await this.ossToken.upImg(file.files[0]);
    if(res){
      this.userInfo['headPortrait'] = res;
    }
    let saveInfoPath = this.userInfo['id'] ? '/collegeWare/updateEmployeeInfo' : '/collegeWare/saveEmployeeInfo';
    this.http.post(saveInfoPath, {paramJson: JSON.stringify(this.userInfo)});
  }
  

}
