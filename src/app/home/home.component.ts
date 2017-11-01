import { LoginService } from './../services/login.service';
import { HttpService } from './../services/http.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare const bubble: any;
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  public hasChildren: boolean;

  public courseWareItems: Array<object>;

  public interviewType: number = 0;

  private subscribe: any;

  constructor(
    private router: Router,
    private http: HttpService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    setTimeout( () => {
      $('.container').animate({scrollTop:2000},500);
    }, 0);
    this.hasChildren = this.router.url.indexOf('/home/') > -1;
    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url)
        if(event.url === '/home'){
          this.getCourse();
        }
      }
      if (event instanceof NavigationEnd) {
        this.hasChildren = event.url.indexOf('/home/') > -1;
      }
    });

    setTimeout( () => {
      bubble();
    }, 0)

    /* 获取课件列表 */
    this.getCourse();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }


  async getCourse() {
    let course = await this.http.get('/course/findByCourseList', {employeeId: this.loginService.userId});
    if(course.code == 1000 && course.result[0]){
      this.http.post('/courseWare/findByCourseId', {employeeId: this.loginService.userId, courseId: course.result[0].couresId})
        .then( (res: any) => {
          this.courseWareItems = res.result;
          this.interviewType = res.interviewType;
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
      alert('闯关成功后，才可以申请面试哦~');
    }
  }

  applyTwo(): void {
    alert('已申请面试, 请保持手机畅通');
  }

}
