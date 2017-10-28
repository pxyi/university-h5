import { VerificationService } from './../../services/verification.service';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss']
})
export class RegisComponent implements OnInit {
  
  private fb: FormBuilder = new FormBuilder();

  /**
   * 定义表单模型
   */
  public formModel: FormGroup;

  constructor(
    private http: HttpService,
    private router: Router,
    public verification: VerificationService
  ) { }

  ngOnInit() {

    this.formModel = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[\u4E00-\u9FA5A-Za-z]+$/)]],
      mobile: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^1(3|4|5|7|8)\d{9}$/)]],
      identifyingCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      passWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

  }

  submit(): void {
    if(this.formModel.valid){
      this.http.post('/user/saveUser', this.formModel.value).then( (res: any) => {
        if(res.code == 1000){
          this.router.navigateByUrl('/login')
        }else{
          alert(res.message);
        }
      }, (err: any) => {
        alert('网络错误, 请刷新重试');
      })
    }
  }

  getCode(): void {
    if(this.formModel.get('mobile').valid){
      this.verification.getCode(this.formModel.get('mobile').value);
    }else{
      alert('请输入正确的手机号')
    }
  }

}
