import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {ConferenceRoutingModule} from '@app/conference/conference-routing.module';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceFrontComponent} from '@app/conference/views/front/conference-front.component';
import {ConferencePreviousEventsComponent} from '@app/conference/views/previous-events/conference-previous-events.component';
import {ConferenceUpcomingEventsComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events.component';
import {ConferenceSponsorRequestComponent} from '@app/conference/views/sponsor-request/conference-sponsor-request.component';
import {ConferenceSponsorRequestPartialComponent} from '@app/conference/views/_partials/_sponsor-request/conference-sponsor-request-partial.component';
import {ConferenceDirectorBoardComponent} from '@app/conference/views/director-board/conference-director-board.component';

@NgModule({
  declarations: [
    ConferenceLayoutComponent,
    ConferenceFrontComponent,
    ConferencePreviousEventsComponent,
    ConferenceUpcomingEventsComponent,
    ConferenceSponsorRequestComponent,
    ConferenceSponsorRequestPartialComponent,
    ConferenceDirectorBoardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConferenceRoutingModule,
  ],
})
export class ConferenceModule { }
