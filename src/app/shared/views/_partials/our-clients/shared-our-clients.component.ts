import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {Client} from '@app/shared/_model';
import {OurClientsDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-shared-our-clients',
  templateUrl: './shared-our-clients.component.html',
  styleUrls: ['./shared-our-clients.component.scss']
})
export class SharedOurClientsComponent implements OnInit{
  @Input() category: string;

  items: Client[] = [];
  defaultItems: Client[] = [

  ];

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: OurClientsDataService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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
