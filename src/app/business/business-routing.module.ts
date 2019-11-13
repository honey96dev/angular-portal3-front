import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/_helpers';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessFrontComponent} from '@app/business/views/front/business-front.component';
import {BusinessAnnualComponent} from '@app/business/views/annual/business-annual.component';
import {BusinessUpcomingComponent} from '@app/business/views/upcoming/business-upcoming.component';
import {BusinessPreviousComponent} from '@app/business/views/previous/business-previous.component';
import {BusinessCourseDetailsComponent} from '@app/business/views/course-details/business-course-details.component';
import {BusinessCourseJoinComponent} from '@app/business/views/course-join/business-course-join.component';
import {BusinessContactUsComponent} from '@app/business/views/contact-us/business-contact-us.component';
import {BusinessDirectorBoardComponent} from '@app/business/views/director-board/business-director-board.component';
import {BusinessMyaccountComponent} from '@app/business/views/myaccount/business-myaccount.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessLayoutComponent,
    children: [
      {path: '', component: BusinessFrontComponent},
      {path: 'annual-upcoming', component: BusinessAnnualComponent},
      {path: 'upcoming', component: BusinessUpcomingComponent},
      {path: 'previous', component: BusinessPreviousComponent},
      {path: 'course-details/:id', component: BusinessCourseDetailsComponent},
      {path: 'course-join/:id', component: BusinessCourseJoinComponent, canActivate: [AuthGuard]},
      {path: 'contact-us', component: BusinessContactUsComponent},
      {path: 'director-board', component: BusinessDirectorBoardComponent},
      {path: 'myaccount', component: BusinessMyaccountComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
