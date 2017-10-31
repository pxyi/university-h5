import { HomeComponent } from './../home.component';
import { async } from '@angular/core/testing';
import { LoginService } from './../../services/login.service';
import { HttpService } from './../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  
  /**
   * 课件Id
   */
  public courseWareId: number;

  /**
   * 当前显示第N题
   */
  public examIndex: any = 1;

  /**
   * 试题列表
   */
  public examItems;

  /**
   * 是否考试完毕
   */
  public isComplate: boolean = false;

  /**
   * 考试结果
   */
  public result: Array<any> = [];

  private daan: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  private startTime: number;

  constructor(
    private routerInfo: ActivatedRoute,
    private http: HttpService,
    private loginService: LoginService
  ) {
    /**
     * 记录开始考试时间
     */
    this.startTime = new Date().getTime();
    // let setInter = setInterval( () => {
    //   let time = new Date().getTime();
    //   if(time - this.startTime > 5 * 60 * 1000){
    //     clearInterval(setInter);
    //     this.examSubmit(true);
    //   }
    // }, 1000)
  }

  ngOnInit() {

    this.routerInfo.params.subscribe( (params: Params) => {
      this.courseWareId = params['id'];
      this.http.get('/question/getExamQuestioInfo', {courseWareId: params['id'], employeeId: this.loginService.userId}).then( (res: any) => {
        this.examItems = res.result.data;
        this.examItems.map( res => {
          if(res.theorySelectType == 0){
            res.answer = [];
            res.options.split('***').map( (d, i) => {
              res.answer[i] = false;
            })
          }
        })
      })
    });
  }

  /**
   * 上一题
   */
  examPrev(): void {
    this.examIndex--;
  }

  /**
   * 下一题
   */
  examNext(): void{
    if(this.isSelected()) this.examIndex++;
  }

  /**
   * 提交试题
   */
  examSubmit(isTimeout = false): void {
    if(this.isSelected() || isTimeout) {
      let listEmployeeScoreTheory = [];
      this.examItems.map( res => {
        let val = '';
        if(res.theorySelectType == 1){
          val = this.daan[res.answer];
        }else{
          res.answer.map( (ans, i) => {
            if(ans) val += this.daan[i];
          })
        }
        listEmployeeScoreTheory.push({questionId: res.questionId, employeeAnswer: val})
      })
      this.http.post('/employeeScore/saveExamScore', {employeeScore: JSON.stringify({
        employeeId: this.loginService.userId,
        courseWarId: this.courseWareId,
        questionTotal: 5,
        startTimes: this.startTime,
        listEmployeeScoreTheory: listEmployeeScoreTheory
      })}).then( (res: any) => {
        if(res.code == 1000){
          this.isComplate = true;
          this.result = new Array(res.result.examScore/2);
        }
      })
    }
  }

  isSelected(): boolean{
    if(this.examItems[this.examIndex - 1].theorySelectType == 1 && this.examItems[this.examIndex - 1].answer == undefined){
      alert('请选择答案');
      return false;
    }
    if(this.examItems[this.examIndex - 1].theorySelectType == 0){
      let bool = false;
      this.examItems[this.examIndex - 1].answer.map(res => { 
        if(res) bool = true;
      })
      if(!bool){
        alert('请选择答案');
        return false;
      }
    }
    return true;
  }

}
