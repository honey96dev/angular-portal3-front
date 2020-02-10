import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@core/reducers';
import {ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import {RouterModule} from '@angular/router';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {LayoutFooterComponent} from '@app/views/layouts/_partials/footer/layout-footer.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {SharedAuthSigninComponent} from '@app/shared/views/auth/signin/shared-auth-signin.component';
import {SharedAuthSignupComponent} from '@app/shared/views/auth/signup/shared-auth-signup.component';
import {SharedForgotPassComponent} from '@app/shared/views/auth/forgot-pass/shared-forgot-pass.component';
import {SharedResetPassComponent} from '@app/shared/views/auth/reset-pass/shared-reset-pass.component';
import {SharedMyaccountComponent} from '@app/shared/views/_partials/myaccount/shared-myaccount.component';
import {SharedMediaSliderComponent} from '@app/shared/views/_partials/media-slider/shared-media-slider.component';
import {SharedContactUsComponent} from '@app/shared/views/_partials/contact-us/shared-contact-us.component';
import {SharedBusinessPartnerComponent} from '@app/shared/views/_partials/business-partner/shared-business-partner.component';
import {SharedOurClientsComponent} from '@app/shared/views/_partials/our-clients/shared-our-clients.component';
import {SharedOurClientsItemComponent} from '@app/shared/views/_partials/our-clients/shared-our-clients-item.component';
import {SharedOurServicesComponent} from '@app/shared/views/_partials/our-services/shared-our-services.component';
import {SharedDirectorsBoardComponent} from '@app/shared/views/_partials/directors-board/shared-directors-board.component';
import {SharedRecentEventsComponent} from '@app/shared/views/_partials/recent-events/shared-recent-events.component';
import {SharedRecentEventsItemComponent} from '@app/shared/views/_partials/recent-events/shared-recent-events-item.component';
import {SharedAllEventsComponent} from '@app/shared/views/_partials/all-events/shared-all-events.component';
import {SharedAllEventsItemComponent} from '@app/shared/views/_partials/all-events/shared-all-events-item.component';
import {SharedEventPhotosComponent} from '@app/shared/views/_partials/event-photos/shared-event-photos.component';
import {SharedEventJoinComponent} from '@app/shared/views/_partials/event-join/shared-event-join.component';
import {SharedCoursesComponent} from '@app/shared/views/_partials/courses/shared-courses.component';
import {SharedCoursesItemComponent} from '@app/shared/views/_partials/courses/shared-courses-item.component';
import {SharedCourseDetailsComponent} from '@app/shared/views/_partials/courses/shared-course-details.component';
import {SharedCourseJoinComponent} from '@app/shared/views/_partials/courses/shared-course-join.component';
import {SharedPrevSponsorsComponent} from '@app/shared/views/_partials/prev-sponsors/shared-prev-sponsors.component';
import {SharedPrevSponsorsItemComponent} from '@app/shared/views/_partials/prev-sponsors/shared-prev-sponsors-item.component';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pan': { direction: Hammer.DIRECTION_All },
    'swipe': { direction: Hammer.DIRECTION_VERTICAL },
  };

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });
    return mc;
  }
}

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RatingModule,
    RouterModule,
    DeviceDetectorModule.forRoot(),
  ],
  declarations: [
    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedAuthSigninComponent,
    SharedAuthSignupComponent,
    SharedForgotPassComponent,
    SharedResetPassComponent,

    SharedMyaccountComponent,

    SharedMediaSliderComponent,
    SharedOurServicesComponent,
    SharedContactUsComponent,
    SharedBusinessPartnerComponent,
    SharedOurClientsComponent,
    SharedOurClientsItemComponent,
    SharedDirectorsBoardComponent,
    SharedRecentEventsComponent,
    SharedRecentEventsItemComponent,
    SharedAllEventsComponent,
    SharedAllEventsItemComponent,
    SharedEventPhotosComponent,
    SharedEventJoinComponent,
    SharedCoursesComponent,
    SharedCoursesItemComponent,
    SharedCourseDetailsComponent,
    SharedCourseJoinComponent,
    SharedPrevSponsorsComponent,
    SharedPrevSponsorsItemComponent,
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
    SharedForgotPassComponent,
    SharedResetPassComponent,

    SharedMyaccountComponent,

    SharedMediaSliderComponent,
    SharedOurServicesComponent,
    SharedContactUsComponent,
    SharedBusinessPartnerComponent,
    SharedOurClientsComponent,
    SharedOurClientsItemComponent,
    SharedDirectorsBoardComponent,
    SharedRecentEventsComponent,
    SharedAllEventsComponent,
    SharedAllEventsItemComponent,
    SharedEventPhotosComponent,
    SharedEventJoinComponent,
    SharedCoursesComponent,
    SharedCoursesItemComponent,
    SharedCourseDetailsComponent,
    SharedCourseJoinComponent,
    SharedPrevSponsorsComponent,
    SharedPrevSponsorsItemComponent,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class SharedModule { }
