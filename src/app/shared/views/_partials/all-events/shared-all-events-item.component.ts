import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {EventsDataService} from '@app/shared/_services';
import {Event} from '@app/shared/_model';
import routes from '@core/routes';

@Component({
  selector: 'app-shared-all-events-item',
  templateUrl: './shared-all-events-item.component.html',
  styleUrls: ['./shared-all-events-item.component.scss']
})
export class SharedAllEventsItemComponent implements OnInit{
  @Input() scope: string;
  @Input() bigPostImage: boolean;
  @Input() data: Event;
  @Input() lang: string;
  routes = routes;
  showMore: boolean = false;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  descriptionBreak: number = 200;
  minified: boolean;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: EventsDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.shortDescriptionEn = this.data.descriptionEn.length > this.descriptionBreak ? this.data.descriptionEn.substr(0, this.descriptionBreak) + '...' : this.data.descriptionEn;
    this.shortDescriptionAr = this.data.descriptionAr.length > this.descriptionBreak ? this.data.descriptionAr.substr(0, this.descriptionBreak) + '...' : this.data.descriptionAr;
    if (this.lang == 'en') {
      this.minified = this.data.descriptionEn.length > this.descriptionBreak;
    } else {
      this.minified = this.data.descriptionAr.length > this.descriptionBreak;
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  setEditableRow() {
    this.service.setEditableRow(this.data);
  }
}
