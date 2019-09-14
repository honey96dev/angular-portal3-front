import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {environment} from '@environments/environment';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {BusinessPartnerDataService} from '@app/shared/_services';
import {PartnerCard} from '@app/shared/_model';

@Component({
  selector: 'app-shared-business-partner',
  templateUrl: './shared-business-partner.component.html',
  styleUrls: ['./shared-business-partner.component.scss']
})
export class SharedBusinessPartnerComponent implements OnInit{
  @Input() category: string;
  defaultSlides: PartnerCard[] = [
    {
      name: 'Welcome',
      title: 'Welcome',
      description: 'Welcome to Elite Resource Center',
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

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: BusinessPartnerDataService) {
  }

  ngOnInit() {
    const {category} = this;
    this.service.list({category}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          this.cards = [];
          let extension;
          for (let slide of res.data) {
            extension = '.' + slide.media.split('.').pop();
            this.cards.push({
              name: slide['name'],
              title: slide.title,
              description: slide.description,
              img: `${environment.assetsBaseUrl}${slide.media}`,
              social1: slide.social1,
              social2: slide.social2,
              social3: slide.social3,
            });
          }
          this.slides = this.chunk(this.cards, 3);
        } else {
          this.cards = this.defaultSlides;
          this.slides = this.chunk(this.cards, 3);
        }
      }, error => {
        this.cards = this.defaultSlides;
        this.slides = this.chunk(this.cards, 3);
      });
  }
}
