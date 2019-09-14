import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-conference-sponsor-request-partial',
  templateUrl: './conference-sponsor-request-partial.component.html',
  styleUrls: ['./conference-sponsor-request-partial.component.scss']
})
export class ConferenceSponsorRequestPartialComponent implements OnInit{
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
