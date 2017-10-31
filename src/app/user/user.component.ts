import { UserInfo } from './info/info.component';
import { OSStokenService } from './../services/osstoken.service';
import { LoginService } from './../services/login.service';
import { HttpService } from './../services/http.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public hasChildren: boolean;

  public userInfo: UserInfo;

  private subscribe: any;

  constructor(
    private router: Router,
    private http: HttpService,
    private loginService: LoginService,
    private ossToken: OSStokenService,
  ) {
    this.ossToken.getOssToken();
  }

  ngOnInit() {
    this.getInfo();
    this.hasChildren = this.router.url.indexOf('/user/') > -1;
    this.subscribe = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if(event.url === '/user'){
            this.getInfo();
          }
        }
        if (event instanceof NavigationEnd) {
          this.hasChildren = event.url.indexOf('/user/') > -1;
        }
      });
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getInfo(): void {
    this.http.post('/collegeWare/findEmployeeInfo', {employeeId: this.loginService.userId}).then( (res: any) => {
      if(res.code == 1000) {
        this.userInfo = res.result;
      }
    })
  }

  goInfo(): void {
    console.log(JSON.stringify(this.userInfo))
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
