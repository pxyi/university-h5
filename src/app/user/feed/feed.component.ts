import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public remark: string;

  constructor(
    private http: HttpService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  submit(): void {
    if(this.remark){
      this.http.post('/collegeWare/insertFeedback', {
        employeeId: this.loginService.userId,
        content: this.remark
      }).then( res => {
        if(res.code == 1000){
          alert('反馈成功');
          this.router.navigateByUrl('/user');
        }
      })
    }else{
      alert('请您输入反馈内容');
    }
  }

}
