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
  
  /**
   * @define 控制子页动画
   */
  public hasChildren: boolean;

  /**
   * @define 课件列表
   */
  public courseWareItems: Array<object>;
  /**
   * @define 最后一条课件
   */
  public courseWareLast: any;

  /**
   * @define 是否申请过面试
   */
  public interviewType: number = 0;

  /**
   * @define 订阅路由变化
   */
  private subscribe: any;

  /**
   * @define 是否显示待面试按钮
   */
  public guideIsShow: boolean = false;

  /**
   * @define 当前通过的课件
   */
  private currentCourse: number = 0;
  /**
   * @define 课件对应顶部的位置
   */
  private courseOffsetTop: number[] = [26.38, 22.8, 20.93, 18.33, 15, 13.85, 10.1, 7.54, 4.2, .65];

  constructor(
    private router: Router,
    private http: HttpService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

    /**
     * @function 控制是否第一次进入首页
     */
    this.guideIsShow = window.localStorage.getItem('loginType') && window.localStorage.getItem('loginType') == '0';
    window.localStorage.setItem('loginType', '1');

    /**
     * @function 滑动到底部
     */
    // setTimeout( () => {
    //   $('.container').animate({scrollTop:2000},500);
    // }, 0);

    /**
     * @function  是否有子页面
     */
    this.hasChildren = this.router.url.indexOf('/home/') > -1;

    /**
     * @function 订阅路由
     */
    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if(event.url === '/home'){
          this.getCourse();
        }
      }
      if (event instanceof NavigationEnd) {
        this.hasChildren = event.url.indexOf('/home/') > -1;
      }
    });

    /**
     * canvas背景
     */
    setTimeout( () => {
      bubble();
    }, 0)

    /* 获取课件列表 */
    this.getCourse();
  }

  /**
   * @function 销毁订阅
   */
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  /**
   * @function 根据课程获取课件
   */
  async getCourse() {
    let course = await this.http.get('/course/findByCourseList', {employeeId: this.loginService.userId});
    if(course.code == 1000 && course.result[0]){
      this.http.post('/courseWare/findByCourseId', {employeeId: this.loginService.userId, courseId: course.result[0].couresId})
        .then( (res: any) => {
          this.courseWareItems = res.result;
          this.interviewType = res.interviewType;
          this.courseWareLast = this.courseWareItems[9];
          this.courseWareItems.map( (item: any, idx: number) => {
            if (item.isUnlocked){
              this.currentCourse = idx;
            }
          });
          $('.container').animate({ scrollTop: this.courseOffsetTop[this.currentCourse] * 50 - 200 }, 500);
        })
    }else{
      alert('暂无课程, 请稍等再试');
    }
  }

  /**
   * @function 跳转
   */
  goDetails(bool, id): void {
    if(bool){
      this.router.navigate(['/home/details', id]);
    }
  }

  /**
   * @function 申请面试
   */
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
