import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceFrontComponent} from '@app/conference/views/front/conference-front.component';
import {ConferencePreviousEventsComponent} from '@app/conference/views/previous-events/conference-previous-events.component';
import {ConferenceUpcomingEventsComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events.component';
import {ConferenceSponsorRequestComponent} from '@app/conference/views/sponsor-request/conference-sponsor-request.component';
import {ConferenceDirectorBoardComponent} from '@app/conference/views/director-board/conference-director-board.component';

const routes: Routes = [
  {
    path: '',
    component: ConferenceLayoutComponent,
    children: [
      {path: '', component: ConferenceFrontComponent},
      {path: 'previous-events', component: ConferencePreviousEventsComponent},
      {path: 'upcoming-events', component: ConferenceUpcomingEventsComponent},
      {path: 'sponsor-request', component: ConferenceSponsorRequestComponent},
      {path: 'director-board', component: ConferenceDirectorBoardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
