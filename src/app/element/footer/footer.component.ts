import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">
      <ul>
        <li [ngClass]="{active: active == 1}" [routerLink]="['/home']">课程中心</li>
        <li [ngClass]="{active: active == 2}" [routerLink]="['/user']">个人中心</li>
      </ul>
    </div>
  `,
  styles: [`
    .footer{
      width: 100%;
      height: 48px;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 9;
    }
    .footer ul{
      width: 100%;
      display: flex;
    }
    .footer li{
      flex: 1;
      height: 48px;
      color: #494949;
      font-size: 14px;
      line-height: 48px;
      text-align: center;
      border: solid 1px #dcdcdc;
    }
    .footer li.active{
      border: none;
      color: #fff;
      background: #5ed6ff;
      pointer-events: none;
    }
  `]
})
export class FooterComponent implements OnInit {

  @Input() active: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
