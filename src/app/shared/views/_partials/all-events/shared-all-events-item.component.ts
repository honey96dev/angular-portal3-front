import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {OurServicesDataService} from '@app/shared/_services';
import {Event} from '@app/shared/_model';

@Component({
  selector: 'app-shared-all-events-item',
  templateUrl: './shared-all-events-item.component.html',
  styleUrls: ['./shared-all-events-item.component.scss']
})
export class SharedAllEventsItemComponent implements OnInit{
  @Input() scope: string;
  @Input() data: Event;
  @Input() lang: string;
  showMore: boolean = false;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  descriptionBreak: number = 200;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: OurServicesDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.shortDescriptionEn = this.data.descriptionEn.length > this.descriptionBreak ? this.data.descriptionEn.substr(0, this.descriptionBreak) + '...' : this.data.descriptionEn;
    this.shortDescriptionAr = this.data.descriptionAr.length > this.descriptionBreak ? this.data.descriptionAr.substr(0, this.descriptionBreak) + '...' : this.data.descriptionAr;
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
