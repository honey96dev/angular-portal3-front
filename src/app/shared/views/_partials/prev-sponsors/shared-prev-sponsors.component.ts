import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {PrevSponsorsDataService} from '@app/shared/_services';
import {Event, Sponsor} from '@app/shared/_model';
import {environment} from '@environments/environment';
import {first} from 'rxjs/operators';
import ext2mime from '@core/ext2mime.json';
import consts from '@core/consts';

@Component({
  selector: 'app-shared-prev-sponsors',
  templateUrl: './shared-prev-sponsors.component.html',
  styleUrls: ['./shared-prev-sponsors.component.scss']
})
export class SharedPrevSponsorsComponent implements OnInit{
  @Input() scope: string;
  @Input() category: string;
  lang: string = '';
  title: string;

  consts = consts;

  items: Sponsor[] = [];
  typeClasses = ['green-text', 'pink-text', 'indigo-text'];
  defaultItems: Sponsor[] = [
    {
      fake: true,
      id: 0,
      typeEn: '',
      typeAr: '',
      typeClass: this.typeClasses[0],
      nameEn: this.translate.instant('COMPANY'),
      nameAr: this.translate.instant('COMPANY'),
      timestamp: new Date().toISOString().substr(0, 10),
      sponsor: '',
      descriptionEn: '',
      descriptionAr: '',
      media: `${environment.assetsBaseUrl}/images/welcome.jpg`,
      mime: 'image/jpeg',
    }
  ];

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: PrevSponsorsDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    const {scope} = this;
    if (scope === consts.previous) {
      this.title = this.translate.instant('SHARED_PREV_SPONSORS.PREVIOUS_SPONSORS');
    } else if (scope === consts.upcoming) {
      this.title = this.translate.instant('SHARED_EVENTS.UPCOMING_EVENTS');
    }
    this.loadData();
  }

  loadData() {
    const {scope, category} = this;
    const limit = consts.eventsCount.normal;
    this.service.list({scope, category, limit}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          let extension;
          let i = 0, cnt = this.typeClasses.length;
          for (let slide of res.data) {
            extension = '.' + slide.media.split('.').pop();
            slide['typeClass'] = this.typeClasses[i++ % cnt];
            slide['media'] = `${environment.assetsBaseUrl}${slide.media}`;
            slide['mime'] = ext2mime[extension];
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
