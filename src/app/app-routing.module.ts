import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from '@app/views/layouts/auth-layout/auth-layout.component';
import {HomeLayoutComponent} from '@app/views/layouts/home-layout/home-layout.component';
import {AuthGuard} from '@app/_helpers';
import {AuthedLayoutComponent} from '@app/views/layouts/authed-layout/authed-layout.component';
import {HomeFrontComponent} from '@app/views/home/front/home-front.component';
import {SharedAuthSigninComponent} from '@app/shared/views/auth/signin/shared-auth-signin.component';
import {SharedAuthSignupComponent} from '@app/shared/views/auth/signup/shared-auth-signup.component';
import {SharedForgotPassComponent} from '@app/shared/views/auth/forgot-pass/shared-forgot-pass.component';
import {SharedResetPassComponent} from '@app/shared/views/auth/reset-pass/shared-reset-pass.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {path: 'sign-in', component: SharedAuthSigninComponent},
      {path: 'sign-up', component: SharedAuthSignupComponent},
      {path: 'forgot-pass', component: SharedForgotPassComponent},
      {path: 'reset-pass/:email/:token', component: SharedResetPassComponent},
    ],
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [
      {path: '', component: HomeFrontComponent},
    ],
  },
  {
    path: 'human',
    loadChildren: () => import('@app/human-capital/human-capital.module').then(module => module.HumanCapitalModule),
  },
  {
    path: 'conference',
    loadChildren: () => import('@app/conference/conference.module').then(module => module.ConferenceModule),
  },
  {
    path: 'business',
    loadChildren: () => import('@app/business/business.module').then(module => module.BusinessModule),
  },
  {
    path: 'app',
    component: AuthedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {path: '', component: DashboardComponent},
    ],
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
