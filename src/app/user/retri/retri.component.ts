import { VerificationService } from './../../services/verification.service';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retri',
  templateUrl: './retri.component.html',
  styleUrls: ['./retri.component.scss']
})
export class RetriComponent implements OnInit {

  public formModel: FormGroup;

  private fb: FormBuilder = new FormBuilder();

  constructor(
    private http: HttpService,
    private router: Router,
    public verification: VerificationService
  ) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      "mobile": ['', [Validators.required, Validators.pattern(/^1(3|4|5|7|8)\d{9}$/)]],
      "identifyingCode": ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^\d+$/)]],
      "passWord": ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]]
    })
  }

  submit(): void {
    if(this.formModel.valid){
      this.http.post('/user/retrievePassword', this.formModel.value).then( (res: any) => {
        alert(res.message);
        if(res.code == 1000){
          this.router.navigateByUrl('/login')
        };
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
