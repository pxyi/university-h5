import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private fb: FormBuilder = new FormBuilder()

  public formModel: FormGroup;

  public loginError: string;

  public isLoading: boolean = false;

  constructor(
    private loginService: LoginService,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {

    this.formModel = this.fb.group({
      mobile: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^1(3|4|5|7|8)\d{9}$/)]],
      passWord: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]]
    })

  }

  submit(): void {
    if(this.formModel.valid && !this.isLoading){
      this.isLoading = true;
      this.http.post('/user/userLogin', this.formModel.value).then( (res: any) => {
        this.isLoading = false
        if(res.code == 1000){
          this.router.navigateByUrl('/home');
          this.loginService.token = res.result.token;
          this.loginService.userId = res.result.id;
          window.localStorage.setItem('token', res.result.token);
          window.localStorage.setItem('userId', res.result.id);
          this.loginError = res.message;
        }else{
          this.loginError = res.message;
        }
      }, err => {
        this.isLoading = false
        this.loginError = '网络错误, 请刷新重试';
      });
    }
  }

}
