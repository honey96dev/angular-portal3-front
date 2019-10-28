import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@core/reducers';
import {ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import {RouterModule} from '@angular/router';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {LayoutFooterComponent} from '@app/views/layouts/_partials/footer/layout-footer.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {SharedAuthSigninComponent} from '@app/shared/views/auth/signin/shared-auth-signin.component';
import {SharedAuthSignupComponent} from '@app/shared/views/auth/signup/shared-auth-signup.component';
import {SharedMediaSliderComponent} from '@app/shared/views/_partials/media-slider/shared-media-slider.component';
import {SharedContactUsComponent} from '@app/shared/views/_partials/contact-us/shared-contact-us.component';
import {SharedBusinessPartnerComponent} from '@app/shared/views/_partials/business-partner/shared-business-partner.component';
import {SharedOurClientsComponent} from '@app/shared/views/_partials/our-clients/shared-our-clients.component';
import {SharedOurServicesComponent} from '@app/shared/views/_partials/our-services/shared-our-services.component';
import {SharedDirectorsBoardComponent} from '@app/shared/views/_partials/directors-board/shared-directors-board.component';
import {SharedRecentEventsComponent} from '@app/shared/views/_partials/recent-events/shared-recent-events.component';
import {SharedRecentEventsItemComponent} from '@app/shared/views/_partials/recent-events/shared-recent-events-item.component';
import {SharedAllEventsComponent} from '@app/shared/views/_partials/all-events/shared-all-events.component';
import {SharedAllEventsItemComponent} from '@app/shared/views/_partials/all-events/shared-all-events-item.component';
import {SharedEventJoinComponent} from '@app/shared/views/_partials/event-join/shared-event-join.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RatingModule,
    RouterModule,
  ],
  declarations: [
    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedAuthSigninComponent,
    SharedAuthSignupComponent,

    SharedMediaSliderComponent,
    SharedOurServicesComponent,
    SharedContactUsComponent,
    SharedBusinessPartnerComponent,
    SharedOurClientsComponent,
    SharedDirectorsBoardComponent,
    SharedRecentEventsComponent,
    SharedRecentEventsItemComponent,
    SharedAllEventsComponent,
    SharedAllEventsItemComponent,
    SharedEventJoinComponent,
  ],
  exports: [
    MDBBootstrapModulesPro,
    StoreModule,
    TranslateModule,

    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedAuthSigninComponent,
    SharedAuthSignupComponent,

    SharedMediaSliderComponent,
    SharedOurServicesComponent,
    SharedContactUsComponent,
    SharedBusinessPartnerComponent,
    SharedOurClientsComponent,
    SharedDirectorsBoardComponent,
    SharedRecentEventsComponent,
    SharedAllEventsComponent,
    SharedEventJoinComponent,
  ]
})
export class SharedModule { }
