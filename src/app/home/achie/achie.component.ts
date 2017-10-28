import { LoginService } from './../../services/login.service';
import { HttpService } from './../../services/http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achie',
  templateUrl: './achie.component.html',
  styleUrls: ['./achie.component.scss']
})
export class AchieComponent implements OnInit {

  public courseWareId;
  public achieInfo;
  private daan: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  constructor(
    private http: HttpService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe( (params: Params) => {
      this.courseWareId = params['id'];
      this.http.post('/employeeScore/getExamScoreInfo', {courseWareId: params['id'], id: '', employeeId: this.loginService.userId}).then( (res: any) => {
        this.achieInfo = res.result;
        this.achieInfo.data.map( (res: any) => {
          res.data = res.employeeAnswer.split('');
          res.data.map( (data, i) => {
            res.data[i] = this.daan.indexOf(data);
          });
        })
      })
    });
  }

}
