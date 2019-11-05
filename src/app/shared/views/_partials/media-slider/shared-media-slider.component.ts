import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {MediaSliderDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import {Slide} from '@app/shared/_model';
import consts from '@core/consts';
import {environment} from '@environments/environment';
import ext2mime from '@core/ext2mime.json';

@Component({
  selector: 'app-shared-media-slider',
  templateUrl: './shared-media-slider.component.html',
  styleUrls: ['./shared-media-slider.component.scss']
})
export class SharedMediaSliderComponent implements OnInit{
  @Input() category: string;
  lang: string = '';

  slides: Slide[] = [];
  defaultSlides: Slide[] = [
    {
      nameEn: 'Welcome',
      nameAr: 'أهلا بك',
      titleEn: 'Welcome',
      titleAr: 'أهلا بك',
      descriptionEn: 'Welcome to Elite Resource Center',
      descriptionAr: 'مرحبًا بكم في مركز موارد النخبة',
      media: `${environment.assetsBaseUrl}/images/welcome.jpg`,
      mime: 'image/jpeg',
    }
  ];

  title: string= '';

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: MediaSliderDataService) {
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

    this.loadData();
  }

  loadData() {
    // console.log(this.category);
    const {category} = this;
    this.service.list({category}).pipe(first())
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
}
