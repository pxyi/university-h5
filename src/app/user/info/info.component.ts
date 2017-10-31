import { OSStokenService } from './../../services/osstoken.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public formModel: FormGroup;
  private fb: FormBuilder = new FormBuilder();

  /**
   * 个人信息
   */
  private userInfo: UserInfo = new UserInfo();

  public isApply: boolean = false;

  constructor(
    private http: HttpService,
    private router: Router,
    private loginService: LoginService,
    private routerInfo: ActivatedRoute,
    private ossToken: OSStokenService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      $("#placeCity").CityPicker();
      $("#expectCity").CityPicker();
    }, 0);
    
    this.formModel = this.fb.group({
      headPortrait: [this.userInfo['headPortrait'] || '', [Validators.required]],
      empName: [this.userInfo['empName'] || '', [Validators.required]],
      sex: [this.userInfo['sex'] || 1, [Validators.required]],
      birthday: [this.userInfo['birthday'] || '', [Validators.required]],
      school: [this.userInfo['school'] || '', [Validators.required]],
      placeCity: [this.userInfo['placeCity'] || '', [Validators.required]],
      expectCity: [this.userInfo['expectCity'] || '', [Validators.required]],
      selfIntroduction: [this.userInfo['selfIntroduction'] || '', [Validators.required]],
      picture: [this.userInfo['picture'] || '******']
    })
    if(this.routerInfo.snapshot.params['info'] === 'apply'){
      this.isApply = true;
      this.http.post('/collegeWare/findEmployeeInfo', {employeeId: this.loginService.userId}).then( (res: any) => {
        if(res.code == 1000) {
          this.userInfo = res.result;
          this.formModel.patchValue(this.userInfo);
        }
      })
    }else{
      this.userInfo = JSON.parse(this.routerInfo.snapshot.params['info']);
      console.log(this.userInfo)
      this.userInfo['picture'] = this.userInfo['picture'] || '';
      this.formModel.patchValue(this.userInfo);
    }
  }

  save(): void {
    let params = this.formModel.value;
    params.placeCity = $('#placeCity').val();
    params.expectCity = $('#expectCity').val();
    // console.log(params);
    params.employeeId = this.loginService.userId;
    if(this.isApply){
      params.interviewType = 1;
    }
    this.http.post('/collegeWare/saveEmployeeInfo', {updatetype: this.userInfo['id'] ? 0 : 1,paramJson: JSON.stringify(params)}).then( res => {
      if(this.isApply && res.code == 1000){
        alert('申请成功, 请等待面试安排');
      }else{
        alert(res.message);
      }
      if(res.code == 1000) {
        this.router.navigateByUrl('/user');
      }
    });
  }


  async picture(file, index) {
    let res = await this.ossToken.upImg(file.files[0]);
    if(res){
      let imgArr = this.formModel.get('picture').value.split('***');
      imgArr[index] = res;
      this.formModel.patchValue({picture: imgArr.join('***')});
    }
  }

  applyInter(): void {
    if(this.formModel.valid){
      this.save();
    }else{
      alert('请完善个人信息');
    }
  }

  removePicture(i: number): void {
    let imgArr = this.formModel.get('picture').value.split('***');
    imgArr[i - 1] = '';
    this.formModel.patchValue({picture: imgArr.join('***')});
  }

}


export class UserInfo {
  constructor (
    public headPortrait: any = '',
    public empName: string = '',
    public sex: number = 1,
    public birthday: string = '',
    public school: string = '',
    public placeCity: string = '',
    public expectCity: string = '',
    public selfIntroduction: string = '',
    public picture: string = '******'
  ) { }
}