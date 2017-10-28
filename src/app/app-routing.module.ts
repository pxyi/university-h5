import { ExamQuitGuard } from './home/exam/exam-quit.guard';
import { LoginGuard } from './services/login.guard';
import { EarnComponent } from './home/earn/earn.component';
import { FeedComponent } from './user/feed/feed.component';
import { RegisComponent } from './user/regis/regis.component';
import { LoginComponent } from './user/login/login.component';
import { ModifyComponent } from './user/modify/modify.component';
import { RetriComponent } from './user/retri/retri.component';
import { NewsComponent } from './user/news/news.component';
import { InfoComponent } from './user/info/info.component';
import { SettingComponent } from './user/setting/setting.component';
import { UserComponent } from './user/user.component';
import { AchieComponent } from './home/achie/achie.component';
import { ExamComponent } from './home/exam/exam.component';
import { DetailsComponent } from './home/details/details.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'details/:id',
        component: DetailsComponent
      },
      {
        path: 'exam/:id',
        component: ExamComponent,
        // canDeactivate: [ExamQuitGuard]
      },
      {
        path: 'achie/:id',
        component: AchieComponent
      },
      {
        path: 'earn/:id',
        component: EarnComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'info/:info',
        component: InfoComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'feed',
        component: FeedComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'regis',
    component: RegisComponent
  },
  {
    path: 'retri',
    component: RetriComponent
  },
  {
    path: 'modify',
    component: ModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
