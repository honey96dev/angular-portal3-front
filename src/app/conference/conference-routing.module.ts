import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/_helpers';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceFrontComponent} from '@app/conference/views/front/conference-front.component';
import {ConferencePreviousEventsComponent} from '@app/conference/views/previous-events/conference-previous-events.component';
import {ConferenceUpcomingEventsComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events.component';
import {ConferenceContactUsComponent} from '@app/conference/views/contact-us/conference-contact-us.component';
import {ConferenceSponsorRequestComponent} from '@app/conference/views/sponsor-request/conference-sponsor-request.component';
import {ConferencePrevSponsorsComponent} from '@app/conference/views/prev-sponsors/conference-prev-sponsors.component';
import {ConferenceDirectorBoardComponent} from '@app/conference/views/director-board/conference-director-board.component';
import {ConferenceEventJoinComponent} from '@app/conference/views/event-join/conference-event-join.component';
import {ConferenceAboutUsComponent} from '@app/conference/views/about-us/conference-about-us.component';
import {ConferenceMyaccountComponent} from '@app/conference/views/myaccount/conference-myaccount.component';

const routes: Routes = [
  {
    path: '',
    component: ConferenceLayoutComponent,
    children: [
      {path: '', component: ConferenceFrontComponent},
      {path: 'previous-events', component: ConferencePreviousEventsComponent},
      {path: 'upcoming-events', component: ConferenceUpcomingEventsComponent},
      {path: 'contact-us', component: ConferenceContactUsComponent},
      {path: 'sponsor-request', component: ConferenceSponsorRequestComponent},
      {path: 'prev-sponsors', component: ConferencePrevSponsorsComponent},
      {path: 'director-board', component: ConferenceDirectorBoardComponent},
      {path: 'event-join/:id', component: ConferenceEventJoinComponent, canActivate: [AuthGuard]},
      {path: 'about-us', component: ConferenceAboutUsComponent},
      {path: 'myaccount', component: ConferenceMyaccountComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
