import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {Client} from '@app/shared/_model';
import {OurClientsDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {environment} from '@environments/environment';
import routes from '@core/routes';

@Component({
  selector: 'app-shared-our-clients',
  templateUrl: './shared-our-clients.component.html',
  styleUrls: ['./shared-our-clients.component.scss']
})
export class SharedOurClientsComponent implements OnInit{
  @Input() category: string;
  lang: string = '';
  routes = routes;
  consts = consts;

  title: string;
  detailLink: string;

  items: Client[] = [];
  defaultItems: Client[] = [
    // {
    //   id: 0,
    //   timestamp: '',
    //   ago: '',
    //   nameEn: this.translate.instant('COMPANY'),
    //   nameAr: this.translate.instant('COMPANY'),
    //   photo: `${environment.assetsBaseUrl}/images/welcome.jpg`,
    //   titleEn: this.translate.instant('COMMON.NO_DATA'),
    //   titleAr: this.translate.instant('COMMON.NO_DATA'),
    //   descriptionEn: '',
    //   descriptionAr: '',
    //   durationEn: '',
    //   durationAr: '',
    //   scopeEn: '',
    //   scopeAr: '',
    //   deliverableEn: '',
    //   deliverableAr: '',
    // },
  ];

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: OurClientsDataService) {
  }

  ngOnInit() {
    this.loadData();
    if (this.category === consts.human) {
      this.title = this.translate.instant('HUMAN_LAYOUT.OUR_CLIENTS');
      this.detailLink = routes.human.client;
    } else if (this.category === consts.business) {
      this.title = this.translate.instant('BUSINESS_LAYOUT.PREV_CLIENTS');
      this.detailLink = routes.business.prevClients;
    }
  }

  loadData() {
    this.lang = this.translate.instant('LANG');
    const {category} = this;
    this.service.list({category}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          let timeDiff;
          for (let item of res.data) {
            item.photo = `${environment.assetsBaseUrl}${item.photo}`;
            timeDiff = item.timeDiff;
            if (timeDiff.M > 1) {
              item.ago = this.translate.instant('COMMON.X_MONTHS_AGO', {val: timeDiff.M});
            } else if (timeDiff.M == 1) {
              item.ago = this.translate.instant('COMMON.A_MONTH_AGO');
            } else if (timeDiff.d > 1) {
              item.ago = this.translate.instant('COMMON.X_DAYS_AGO', {val: timeDiff.d});
            } else if (timeDiff.d == 1) {
              item.ago = this.translate.instant('COMMON.A_DAY_AGO');
            } else if (timeDiff.h > 1) {
              item.ago = this.translate.instant('COMMON.X_HOURS_AGO', {val: timeDiff.h});
            } else if (timeDiff.h == 1) {
              item.ago = this.translate.instant('COMMON.A_HOUR_AGO');
            } else if (timeDiff.m > 1) {
              item.ago = this.translate.instant('COMMON.X_MINUTES_AGO', {val: timeDiff.m});
            } else if (timeDiff.m == 1) {
              item.ago = this.translate.instant('COMMON.A_MINUTE_AGO');
            }
          }
          this.items = res.data;
        } else {
          this.items = this.defaultItems;
        }
      }, error => {
        this.items = this.defaultItems;
      });
  }
}
