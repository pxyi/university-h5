import { LoginService } from './../../services/login.service';
import { HttpService } from './../../services/http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public courseWareInfo: any;

  private courseWareId: number;

  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private http: HttpService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.routerInfo.params.subscribe( (params: Params) => {
      this.courseWareId = params['id'];
      this.http.post('/courseWare/findById', {id: params['id'], employeeId: this.loginService.userId}).then( (res: any) => {
        this.courseWareInfo = res.result;
      })
    });
  }

  goEarn(): void {
    this.router.navigate(['/home/earn', this.courseWareId])
  }
}
