import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

declare const OSS: any;

@Injectable()
export class OSStokenService {

  constructor(
    private http: HttpService
  ) { }

  public aliyunClient: any;

  getOssToken(): void {
    var bucket = 'ylbb-business';
    var region = 'oss-cn-beijing';
    var client;
    this.http.get('/courseWare/getAccessKeyToken', {}).then( res => {
      if(res.code == 1000) { 
        var creds = res.result; 
        this.aliyunClient = new OSS.Wrapper({
          region: region,
          accessKeyId: creds.accessKeyId,
          accessKeySecret: creds.accessKeySecret,
          stsToken: creds.securityToken,
          bucket: bucket
        });
      }
    })
  }

  upImg(file): Promise<string | boolean>{
    let key = (new Date()).getTime() + '.' + file.type.split('/')[1];
    return new Promise( (resolve, reject) => {
      this.aliyunClient.multipartUpload(key, file, {}).then(function (res) {
        var src = res.url ? res.url : 'http://'+ res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
        resolve(src);
      }, function (e) {
        reject(false);
        alert('上传图片失败');
      });
    })
  }


}
