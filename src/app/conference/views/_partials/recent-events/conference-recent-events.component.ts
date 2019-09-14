import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-conference-recent-events',
  templateUrl: './conference-recent-events.component.html',
  styleUrls: ['./conference-recent-events.component.scss']
})
export class ConferenceRecentEventsComponent implements OnInit{
  @Input() category: string;
  title: string;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.category === 'previous') {
      this.title = this.translate.instant('CONFERENCE_RECENT_EVENTS.LAST_EVENTS');
    } else if (this.category === 'upcoming') {
      this.title = this.translate.instant('CONFERENCE_RECENT_EVENTS.MOST_UPCOMING');
    }
  }
}
