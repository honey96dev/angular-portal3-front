import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessRoutingModule} from '@app/business/business-routing.module';
import {BusinessFrontComponent} from '@app/business/views/front/business-front.component';
import {BusinessBusinessPartnerComponent} from '@app/business/views/business-partner/business-business-partner.component';
import {BusinessOurClientsComponent} from '@app/business/views/our-clients/business-our-clients.component';
import {BusinessContactUsComponent} from '@app/business/views/contact-us/business-contact-us.component';

@NgModule({
  declarations: [
    BusinessLayoutComponent,
    BusinessFrontComponent,
    BusinessBusinessPartnerComponent,
    BusinessOurClientsComponent,
    BusinessContactUsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessRoutingModule,
  ],
})
export class BusinessModule { }
