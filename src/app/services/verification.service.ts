import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VerificationService {

  constructor(
    private http: HttpService
  ) { }

  public resetTime: number = 60;

  public getCodeTime: number;
  
  getCode(mobile): void {
    if(this.getCodeTime > 0){ return; }
    this.http.post('/user/sendIdentifyingCode', {mobile: mobile}).then( (res: any) => {
      if(res.code == 1000){
        this.getCodeTime = this.resetTime;
        let interTime = setInterval( () => {
          this.getCodeTime--;
          if(this.getCodeTime <= 0){
            this.getCodeTime = undefined;
            clearInterval(interTime);
          }
        }, 1000)
      }else{
        alert(res.message);
      }
    }, err => {
      alert('网络错误, 请刷新重试');
    })
  }

}
