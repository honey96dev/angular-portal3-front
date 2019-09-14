import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {CheckForceValidator, ErrorInterceptor, JwtInterceptor, MatchValueValidator} from '@app/_helpers';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeLayoutComponent} from '@app/views/layouts/home-layout/home-layout.component';
import {HomeFrontComponent} from '@app/views/home/front/home-front.component';
import {AuthLayoutComponent} from '@app/views/layouts/auth-layout/auth-layout.component';
import {AuthedLayoutComponent} from '@app/views/layouts/authed-layout/authed-layout.component';
import {SharedModule} from '@app/shared/shared.module';
import {FormsModule} from '@angular/forms';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {LanguageInterceptor} from '@app/_helpers/language.interceptor';

@NgModule({
  declarations: [
    CheckForceValidator,
    MatchValueValidator,
    AppComponent,
    HomeLayoutComponent,
    HomeFrontComponent,
    AuthLayoutComponent,
    AuthedLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot(),
    SharedModule,
  ],
  providers: [
    Title,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    MDBSpinningPreloader,
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    AlertModalComponent,
    QuestionModalComponent,
  ]
})
export class AppModule {
}
