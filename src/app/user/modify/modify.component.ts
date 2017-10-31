import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  public formModel: FormGroup;

  private fb: FormBuilder = new FormBuilder();

  constructor(
    private http: HttpService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      "passWord": ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.maxLength(20)]],
      "newPassWord": ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.maxLength(20)]],
      "newenterpass": ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.maxLength(20)]],
    })
  }

  submit(): void {
    if(this.formModel.valid && this.formModel.get('newPassWord').value === this.formModel.get('newenterpass').value){
      // console.log(this.formModel.value)
      this.http.post('/employee/modifyNewPassword', {
        employeeId: this.loginService.userId, 
        passWord: this.formModel.get('passWord').value,
        newPassWord: this.formModel.get('newPassWord').value
      }).then( res => {
        alert(res.message);
        if(res.code == 1000){
          window.localStorage.clear();
          this.http.post('/user/userLogout', {});
          this.loginService.token = '';
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

}
