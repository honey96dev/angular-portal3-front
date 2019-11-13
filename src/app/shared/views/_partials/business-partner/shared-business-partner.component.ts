import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {environment} from '@environments/environment';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {BusinessPartnerDataService, DirectorBoardDataService} from '@app/shared/_services';
import {PartnerCard} from '@app/shared/_model';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-shared-business-partner',
  templateUrl: './shared-business-partner.component.html',
  styleUrls: ['./shared-business-partner.component.scss']
})
export class SharedBusinessPartnerComponent implements OnInit{
  @Input() category: string;
  lang: string = '';
  defaultSlides: PartnerCard[] = [
    {
      nameEn: 'Welcome',
      nameAr: 'أهلا بك',
      titleEn: 'Welcome',
      titleAr: 'أهلا بك',
      descriptionEn: 'Welcome to Elite Resource Center',
      descriptionAr: 'مرحبًا بكم في مركز موارد النخبة',
      img: `${environment.assetsBaseUrl}/images/welcome.jpg`,
    }
  ];
  cards: PartnerCard[] = [
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: BusinessPartnerDataService,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    const {category} = this;
    this.service.list({category}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          const titleBreak = 25;
          const descriptionBreak = 240;
          // this.cards = [];
          let extension;
          for (let slide of res.data) {
            extension = '.' + slide.media.split('.').pop();
            // this.cards.push({
            //   name: slide['name'],
            //   title: slide.title,
            //   description: slide.description,
            //   img: `${environment.assetsBaseUrl}${slide.media}`,
            //   social1: slide.social1,
            //   social2: slide.social2,
            //   social3: slide.social3,
            // });
            slide['titleEn'] && (slide['titleEn'] = slide['titleEn'].length > titleBreak ? slide['titleEn'].substr(0, titleBreak) + '...' : slide['titleEn']);
            slide['titleAr'] && (slide['titleAr'] = slide['titleAr'].length > titleBreak ? slide['titleAr'].substr(0, titleBreak) + '...' : slide['titleAr']);slide['descriptionEn'] && (slide['descriptionEn'] = slide['descriptionEn'].length > descriptionBreak ? slide['descriptionEn'].substr(0, descriptionBreak) + '...' : slide['descriptionEn']);
            slide['descriptionAr'] && (slide['descriptionAr'] = slide['descriptionAr'].length > descriptionBreak ? slide['descriptionAr'].substr(0, descriptionBreak) + '...' : slide['descriptionAr']);
            slide['img'] = `${environment.assetsBaseUrl}${slide.media}`;
          }
          this.cards = res.data;
          this.slides = this.chunk(this.cards, 3);
        } else {
          this.cards = this.defaultSlides;
          this.slides = this.chunk(this.cards, 3);
        }
      }, error => {
        this.cards = this.defaultSlides;
        this.slides = this.chunk(this.cards, 3);
      });

    this.isDesktop = this.deviceService.isDesktop();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }
}
