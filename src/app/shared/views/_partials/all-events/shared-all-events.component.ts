import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {EventsDataService} from '@app/shared/_services';

@Component({
  selector: 'app-shared-all-events',
  templateUrl: './shared-all-events.component.html',
  styleUrls: ['./shared-all-events.component.scss']
})
export class SharedAllEventsComponent implements OnInit{
  @Input() category: string;
  title: string;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: EventsDataService) {
  }

  ngOnInit() {
    if (this.category === 'previous') {
      this.title = this.translate.instant('CONFERENCE_LAYOUT.PREVIOUS_EVENTS');
    } else if (this.category === 'upcoming') {
      this.title = this.translate.instant('CONFERENCE_LAYOUT.UPCOMING_EVENTS');
    }
  }
}
