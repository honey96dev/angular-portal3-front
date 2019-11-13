import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {CoursesDataService, TrainingDataService} from '@app/shared/_services';
import {Course, Event} from '@app/shared/_model';
import {environment} from '@environments/environment';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';

@Component({
  selector: 'app-shared-courses',
  templateUrl: './shared-courses.component.html',
  styleUrls: ['./shared-courses.component.scss']
})
export class SharedCoursesComponent implements OnInit{
  @Input() scope: string;
  lang: string = '';
  title: string;

  consts = consts;

  summary = {};

  items: Event[] = [];
  typeClasses = ['green-text', 'pink-text', 'indigo-text'];
  defaultItems: Course[] = [
    {
      fake: true,
      id: 0,
      typeEn: '',
      typeAr: '',
      typeClass: this.typeClasses[0],
      nameEn: this.translate.instant('COMPANY'),
      nameAr: this.translate.instant('COMPANY'),
      timestamp: new Date().toISOString().substr(0, 10),
      titleEn: this.translate.instant('COMMON.NO_DATA'),
      titleAr: this.translate.instant('COMMON.NO_DATA'),
      summaryEn: '',
      summaryAr: '',
      descriptionEn: '',
      descriptionAr: '',
      media: `${environment.assetsBaseUrl}/images/welcome.jpg`,
      mime: 'image/jpeg',
    }
  ];

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: CoursesDataService,
              private trainingService: TrainingDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    const {scope} = this;
    if (scope === consts.previous) {
      this.title = this.translate.instant('BUSINESS_LAYOUT.PREVIOUS');
    } else if (scope === consts.upcoming) {
      this.title = this.translate.instant('BUSINESS_LAYOUT.MOST_UPCOMING');
    } else {
      this.trainingService.annualUpcomingYear({}).pipe(first())
        .subscribe(res => {
          if (res.result === consts.success) {
            this.title = this.translate.instant('BUSINESS_LAYOUT.ANNUAL_UPCOMING', {year: res.data});
          } else {
            this.title = '';
          }
        }, error => {
          this.title = '';
        });
      this.trainingService.loadAllSettings({}).pipe(first())
        .subscribe(res => {
          if (res.result === consts.success) {
            this.summary = {
              en: res['data'][consts.annualUpcomingSummaryEn],
              ar: res['data'][consts.annualUpcomingSummaryAr],
            }
          } else {
            this.summary = {
              en: '',
              ar: '',
            }
          }
        }, error => {
          this.summary = {
            en: '',
            ar: '',
          }
        });
    }
    this.loadData();
  }

  loadData() {
    // console.log(this.category);
    const {scope} = this;
    const limit = scope === 'upcoming' ? consts.coursesCount.normal : consts.coursesCount.normal;
    this.service.list({scope, limit}).pipe(first())
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
        } else {
          this.items = this.defaultItems;
        }
      }, error => {
        this.items = this.defaultItems;
      });
  }
}
