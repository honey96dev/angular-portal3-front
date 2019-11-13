import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessRoutingModule} from '@app/business/business-routing.module';
import {BusinessFrontComponent} from '@app/business/views/front/business-front.component';
import {BusinessAnnualComponent} from '@app/business/views/annual/business-annual.component';
import {BusinessUpcomingComponent} from '@app/business/views/upcoming/business-upcoming.component';
import {BusinessPreviousComponent} from '@app/business/views/previous/business-previous.component';
import {BusinessCourseDetailsComponent} from '@app/business/views/course-details/business-course-details.component';
import {BusinessCourseJoinComponent} from '@app/business/views/course-join/business-course-join.component';
import {BusinessContactUsComponent} from '@app/business/views/contact-us/business-contact-us.component';
import {BusinessDirectorBoardComponent} from '@app/business/views/director-board/business-director-board.component';
import {BusinessMyaccountComponent} from '@app/business/views/myaccount/business-myaccount.component';

@NgModule({
  declarations: [
    BusinessLayoutComponent,
    BusinessFrontComponent,
    BusinessAnnualComponent,
    BusinessUpcomingComponent,
    BusinessPreviousComponent,
    BusinessCourseDetailsComponent,
    BusinessCourseJoinComponent,
    BusinessContactUsComponent,
    BusinessDirectorBoardComponent,
    BusinessMyaccountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessRoutingModule,
  ],
})
export class BusinessModule { }
