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

  slides: Slide[] = [];
  defaultSlides: Slide[] = [
    {
      name: 'Welcome',
      title: 'Welcome',
      description: 'Welcome to Elite Resource Center',
      media: `${environment.assetsBaseUrl}/images/welcome.jpg`,
      mime: 'image/jpeg',
    }
  ];

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: MediaSliderDataService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // console.log(this.category);
    const {category} = this;
    this.service.list({category}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success && res.data.length > 0) {
          this.slides = [];
          let extension;
          for (let slide of res.data) {
            extension = '.' + slide.media.split('.').pop();
            this.slides.push({
              name: slide['name'],
              title: slide.name,
              description: slide.description,
              media: `${environment.assetsBaseUrl}${slide.media}`,
              mime: ext2mime[extension],
            });
          }
        } else {
          this.slides = this.defaultSlides;
        }
      }, error => {
        this.slides = this.defaultSlides;
      });
  }
}
