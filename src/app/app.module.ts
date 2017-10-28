import { OSStokenService } from './services/osstoken.service';
import { ExamQuitGuard } from './home/exam/exam-quit.guard';
import { LoginGuard } from './services/login.guard';
import { LoginService } from './services/login.service';
import { PromptService } from './services/prompt.service';
import { LoadingService } from './services/loading.service';
import { VerificationService } from './services/verification.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisComponent } from './user/regis/regis.component';
import { RetriComponent } from './user/retri/retri.component';
import { ModifyComponent } from './user/modify/modify.component';
import { SettingComponent } from './user/setting/setting.component';
import { InfoComponent } from './user/info/info.component';
import { NoticeComponent } from './user/notice/notice.component';
import { NewsComponent } from './user/news/news.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './home/details/details.component';
import { EarnComponent } from './home/earn/earn.component';
import { ExamComponent } from './home/exam/exam.component';
import { AchieComponent } from './home/achie/achie.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './element/header/header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FooterComponent } from './element/footer/footer.component';
import { FeedComponent } from './user/feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisComponent,
    RetriComponent,
    ModifyComponent,
    SettingComponent,
    InfoComponent,
    NoticeComponent,
    NewsComponent,
    UserComponent,
    DetailsComponent,
    EarnComponent,
    ExamComponent,
    AchieComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FeedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginGuard,
    ExamQuitGuard,
    LoginService,
    HttpService,
    OSStokenService,
    VerificationService,
    LoadingService,
    PromptService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
