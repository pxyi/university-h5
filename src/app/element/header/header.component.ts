import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header" [ngClass]="{active: background == 'white'}">
      <a href="javascript: void(0);" class="go-back" *ngIf="redirectTo" [routerLink]="redirectTo">
        <img src="assets/images/go-back{{background == 'white' ? '-white' : ''}}.png" />
      </a>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .header{
      width: 100%;
      height: 45px;
      color: #494949;
      font-size: 16px;
      line-height: 45px;
      text-align: center;
      background: #fff;
      border-bottom: solid 1px #e7e7e7;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
    }
    .header.active{
      background: rgba(255, 255, 255, 0);
      color: #fff;
      border-bottom: 0;
    }
    .go-back{
      display: block;
      width: 45px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
    }
    .go-back img{
      display: inline-block;
      width: 10px;
      vertical-align: middle;
    }
  `]
})
export class HeaderComponent implements OnInit {

  @Input() redirectTo: string | Array<any>;

  @Input() background: string = '';



  constructor() { }

  ngOnInit() {
    if(typeof this.redirectTo === 'string'){
      this.redirectTo = [this.redirectTo];
    }
  }

}
