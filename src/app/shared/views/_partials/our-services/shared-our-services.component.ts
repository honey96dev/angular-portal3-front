import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {OurServicesDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {ServiceCard} from '@app/shared/_model';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';

@Component({
  selector: 'app-shared-our-services',
  templateUrl: './shared-our-services.component.html',
  styleUrls: ['./shared-our-services.component.scss']
})
export class SharedOurServicesComponent implements OnInit{
  @Input() category: string;
  lang: string = '';
  defaultSlides: ServiceCard[] = [
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
  cards: ServiceCard[] = [
  ];
  slides: any = [[]];
  chunkSize:number = 1;

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: OurServicesDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    const {category} = this;
    this.service.list({category}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          let extension;
          for (let slide of res.data) {
            extension = '.' + slide.media.split('.').pop();
            // this.cards.push({
            //   name: slide['name'],
            //   title: slide.name,
            //   description: slide.description,
            //   img: `${environment.assetsBaseUrl}${slide.media}`,
            // });
            slide['img'] = `${environment.assetsBaseUrl}${slide.media}`;
            slide['mime'] = ext2mime[extension];
          }
          this.cards = res.data;
          this.slides = this.chunk(this.cards, this.chunkSize);
        } else {
          this.cards = this.defaultSlides;
          this.slides = this.chunk(this.cards, this.chunkSize);
        }
      }, error => {
        this.cards = this.defaultSlides;
        this.slides = this.chunk(this.cards, this.chunkSize);
      });
  }
}
