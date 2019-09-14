import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessFrontComponent} from '@app/business/views/front/business-front.component';
import {BusinessBusinessPartnerComponent} from '@app/business/views/business-partner/business-business-partner.component';
import {BusinessOurClientsComponent} from '@app/business/views/our-clients/business-our-clients.component';
import {BusinessContactUsComponent} from '@app/business/views/contact-us/business-contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessLayoutComponent,
    children: [
      {path: '', component: BusinessFrontComponent},
      {path: 'business-partner', component: BusinessBusinessPartnerComponent},
      {path: 'our-clients', component: BusinessOurClientsComponent},
      {path: 'contact-us', component: BusinessContactUsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
