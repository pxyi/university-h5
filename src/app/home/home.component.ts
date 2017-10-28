import { LoginService } from './../services/login.service';
import { HttpService } from './../services/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public hasChildren: boolean;

  public courseWareItems: Array<object>;

  public isHideApply: boolean = false;

  constructor(
    private router: Router,
    private http: HttpService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.hasChildren = this.router.url.indexOf('/home/') > -1;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hasChildren = event.url.indexOf('/home/') > -1;
        console.log(event)
      }
    });

    /* 获取课件列表 */
    this.getCourse();
  }


  async getCourse() {
    let course = await this.http.get('/course/findByCourseList', {employeeId: this.loginService.userId});
    if(course.code == 1000 && course.result[0]){
      this.http.post('/courseWare/findByCourseId', {employeeId: this.loginService.userId, courseId: course.result[0].couresId})
        .then( (res: any) => {
          this.courseWareItems = res.result;
          this.isHideApply = res.interviewType == 1;
        })
    }else{
      alert('暂无课程, 请稍等再试');
    }
  }

  goDetails(bool, id): void {
    if(bool){
      this.router.navigate(['/home/details', id]);
    }
  }


  goApply(): void {
    let score = this.courseWareItems[this.courseWareItems.length - 1]['theoryExamScore'];
    if(score && score >= 6){
      this.router.navigate(['/user/info', 'apply']);
    }else{
      alert('请先学完整门课程,并考试成绩均在6分以上');
    }
  }

}
