import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {ConferenceRoutingModule} from '@app/conference/conference-routing.module';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceFrontComponent} from '@app/conference/views/front/conference-front.component';
import {ConferencePreviousEventsComponent} from '@app/conference/views/previous-events/conference-previous-events.component';
import {ConferenceUpcomingEventsComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events.component';
import {ConferenceContactUsComponent} from '@app/conference/views/contact-us/conference-contact-us.component';
import {ConferenceSponsorRequestComponent} from '@app/conference/views/sponsor-request/conference-sponsor-request.component';
import {ConferenceSponsorRequestPartialComponent} from '@app/conference/views/_partials/_sponsor-request/conference-sponsor-request-partial.component';
import {ConferencePrevSponsorsComponent} from '@app/conference/views/prev-sponsors/conference-prev-sponsors.component';
import {ConferenceDirectorBoardComponent} from '@app/conference/views/director-board/conference-director-board.component';
import {ConferenceEventJoinComponent} from '@app/conference/views/event-join/conference-event-join.component';
import {ConferenceMyaccountComponent} from '@app/conference/views/myaccount/conference-myaccount.component';

@NgModule({
  declarations: [
    ConferenceLayoutComponent,
    ConferenceFrontComponent,
    ConferencePreviousEventsComponent,
    ConferenceUpcomingEventsComponent,
    ConferenceContactUsComponent,
    ConferenceSponsorRequestComponent,
    ConferenceSponsorRequestPartialComponent,
    ConferencePrevSponsorsComponent,
    ConferenceDirectorBoardComponent,
    ConferenceEventJoinComponent,
    ConferenceMyaccountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConferenceRoutingModule,
  ],
})
export class ConferenceModule { }
