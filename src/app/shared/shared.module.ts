import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@core/reducers';
import {SharedDirectorsBoardComponent} from '@app/shared/views/_partials/directors-board/shared-directors-board.component';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {LayoutFooterComponent} from '@app/views/layouts/_partials/footer/layout-footer.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {SharedMediaSliderComponent} from '@app/shared/views/_partials/media-slider/shared-media-slider.component';
import {SharedContactUsComponent} from '@app/shared/views/_partials/contact-us/shared-contact-us.component';
import {SharedBusinessPartnerComponent} from '@app/shared/views/_partials/business-partner/shared-business-partner.component';
import {SharedOurClientsComponent} from '@app/shared/views/_partials/our-clients/shared-our-clients.component';
import {SharedOurServicesComponent} from '@app/shared/views/_partials/our-services/shared-our-services.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RatingModule,
  ],
  declarations: [
    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedBusinessPartnerComponent,
    SharedContactUsComponent,
    SharedDirectorsBoardComponent,
    SharedMediaSliderComponent,
    SharedOurClientsComponent,
    SharedOurServicesComponent,
  ],
  exports: [
    MDBBootstrapModulesPro,
    StoreModule,
    TranslateModule,

    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedBusinessPartnerComponent,
    SharedContactUsComponent,
    SharedDirectorsBoardComponent,
    SharedMediaSliderComponent,
    SharedOurClientsComponent,
    SharedOurServicesComponent,
  ]
})
export class SharedModule { }
