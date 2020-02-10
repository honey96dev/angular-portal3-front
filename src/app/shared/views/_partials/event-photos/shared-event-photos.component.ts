import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {EventPhotosDataService, EventsDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import {EventPhoto} from '@app/shared/_model';
import consts from '@core/consts';
import {environment} from '@environments/environment';
import ext2mime from '@core/ext2mime.json';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-event-photos',
  templateUrl: './shared-event-photos.component.html',
  styleUrls: ['./shared-event-photos.component.scss']
})
export class SharedEventPhotosComponent implements OnInit{
  @Input() category: string;
  lang: string = '';
  consts = consts;

  targetId: string;
  event: any;

  slides: EventPhoto[] = [];
  defaultSlides: EventPhoto[] = [
    // {
    //   nameEn: 'Welcome',
    //   nameAr: 'أهلا بك',
    //   media: `${environment.assetsBaseUrl}/images/welcome.jpg`,
    //   mime: 'image/jpeg',
    // }
  ];

  title: string= '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: EventPhotosDataService,
              private eventService: EventsDataService,
              private location: Location) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');

    const {category} = this;
    if (category === consts.human) {
      this.title = this.translate.instant('HOME_FRONT.HUMAN_CAPITAL');
    } else if (category === consts.conference) {
      this.title = this.translate.instant('HOME_FRONT.CONFERENCE');
    } else {
      this.title = this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION');
    }

    this.route.paramMap.subscribe(map => {
      this.targetId = map.get("targetId");
      this.loadParentData();
      this.loadData();
    });
  }

  loadParentData() {
    this.eventService.get({id: this.targetId}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success) {
          const extension = '.' + res.data['media'].split('.').pop();
          // this.slides.push({
          //   name: slide['name'],
          //   title: slide.name,
          //   description: slide.description,
          //   media: `${environment.assetsBaseUrl}${slide.media}`,
          //   mime: ext2mime[extension],
          // });
          res.data['media'] = `${environment.assetsBaseUrl}${res.data['media']}`;
          res.data['mime'] = ext2mime[extension];
          this.event = res.data;
        } else {
          this.event = undefined;
        }
      }, error => {
        this.event = undefined;
      });
  }

  loadData() {
    // console.log(this.category);
    const {category, targetId} = this;
    this.service.list({category, targetId}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          let extension;
          for (let slide of res.data) {
            extension = '.' + slide['media'].split('.').pop();
            // this.slides.push({
            //   name: slide['name'],
            //   title: slide.name,
            //   description: slide.description,
            //   media: `${environment.assetsBaseUrl}${slide.media}`,
            //   mime: ext2mime[extension],
            // });
            slide['media'] = `${environment.assetsBaseUrl}${slide.media}`;
            slide['mime'] = ext2mime[extension];
          }
          this.slides = res.data;
        } else {
          this.slides = this.defaultSlides;
        }
      }, error => {
        this.slides = this.defaultSlides;
      });
  }

  goBack(params) {
    this.location.back();
  }
}
