import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {EventsDataService} from '@app/shared/_services';
import {Event} from '@app/shared/_model';
import {environment} from '@environments/environment';
import {first} from 'rxjs/operators';
import ext2mime from '@core/ext2mime.json';
import consts from '@core/consts';

@Component({
  selector: 'app-shared-all-events',
  templateUrl: './shared-all-events.component.html',
  styleUrls: ['./shared-all-events.component.scss']
})
export class SharedAllEventsComponent implements OnInit{
  @Input() scope: string;
  @Input() category: string;
  lang: string = '';
  title: string;

  consts = consts;

  items: Event[] = [];
  typeClasses = ['green-text', 'pink-text', 'indigo-text'];
  defaultItems: Event[] = [
    {
      fake: true,
      id: 0,
      typeEn: '',
      typeAr: '',
      typeClass: this.typeClasses[0],
      nameEn: this.translate.instant('COMPANY'),
      nameAr: this.translate.instant('COMPANY'),
      titleEn: this.translate.instant('COMMON.NO_DATA'),
      titleAr: this.translate.instant('COMMON.NO_DATA'),
      timestamp: new Date().toISOString().substr(0, 10),
      descriptionEn: '',
      descriptionAr: '',
      media: `${environment.assetsBaseUrl}/images/welcome.jpg`,
      mime: 'image/jpeg',
    }
  ];

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: EventsDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    const {scope} = this;
    if (scope === consts.previous) {
      this.title = this.translate.instant('SHARED_EVENTS.PREVIOUS_EVENTS');
    } else if (scope === consts.upcoming) {
      this.title = this.translate.instant('SHARED_EVENTS.UPCOMING_EVENTS');
    }
    this.loadData();
  }

  loadData() {
    // console.log(this.category);
    const {scope, category} = this;
    const limit = consts.eventsCount.normal;
    this.service.list({scope, category, limit}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          // this.items = [];
          let extension;
          let i = 0, cnt = this.typeClasses.length;
          for (let slide of res.data) {
            extension = '.' + slide.media.split('.').pop();
            // this.items.push({
            //   type: slide.type,
            //   typeClass: this.typeClasses[i++ % cnt],
            //   name: slide.name,
            //   timestamp: slide.timestamp,
            //   title: slide.name,
            //   description: slide.description,
            //   media: `${environment.assetsBaseUrl}${slide.media}`,
            //   mime: ext2mime[extension],
            // });
            slide['typeClass'] = this.typeClasses[i++ % cnt];
            slide['media'] = `${environment.assetsBaseUrl}${slide.media}`;
            slide['mime'] = ext2mime[extension];
          }
          this.items = res.data;
          this.items.splice(0, consts.eventsCount.recent);
        } else {
          this.items = this.defaultItems;
        }
      }, error => {
        this.items = this.defaultItems;
      });
  }
}
