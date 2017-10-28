import { LoginService } from './../../services/login.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.scss']
})
export class EarnComponent implements OnInit {
  
  public courseWareId: number;

  public courseWareInfo: any;
  
  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private http: HttpService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.routerInfo.params.subscribe( (params: Params) => {
      this.courseWareId = params['id'];
      this.http.post('/collegeWare/getEmployeeScore', {courseWareId: params['id'], courseId: '', employeeId: this.loginService.userId}).then( (res: any) => {
        this.courseWareInfo = res.result;
      })
    });
  }
}
