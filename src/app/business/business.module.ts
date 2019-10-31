import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessRoutingModule} from '@app/business/business-routing.module';
import {BusinessFrontComponent} from '@app/business/views/front/business-front.component';
import {BusinessContactUsComponent} from '@app/business/views/contact-us/business-contact-us.component';
import {BusinessDirectorBoardComponent} from '@app/business/views/director-board/business-director-board.component';

@NgModule({
  declarations: [
    BusinessLayoutComponent,
    BusinessFrontComponent,
    BusinessContactUsComponent,
    BusinessDirectorBoardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessRoutingModule,
  ],
})
export class BusinessModule { }
