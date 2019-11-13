import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {PrevSponsorsDataService} from '@app/shared/_services';
import {Sponsor} from '@app/shared/_model';
import routes from '@core/routes';

@Component({
  selector: 'app-shared-prev-sponsors-item',
  templateUrl: './shared-prev-sponsors-item.component.html',
  styleUrls: ['./shared-prev-sponsors-item.component.scss']
})
export class SharedPrevSponsorsItemComponent implements OnInit{
  @Input() scope: string;
  @Input() data: Sponsor;
  @Input() lang: string;
  routes = routes;
  sponsor: string;
  showMore: boolean = false;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  descriptionBreak: number = 200;
  minified: boolean;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: PrevSponsorsDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    if (this.data.sponsor.length > 0) {
      this.sponsor = this.translate.instant('SHARED_PREV_SPONSORS.' + this.data['sponsor']);
    } else {
      this.sponsor = this.translate.instant('COMMON.NO_DATA');
    }
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
