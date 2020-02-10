import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {AboutUsDataService} from '@app/_services';
import {pipe} from 'rxjs';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {environment} from '@environments/environment';
import ext2mime from '@core/ext2mime.json';

@Component({
  selector: 'app-human-about-us',
  templateUrl: './human-about-us.component.html',
  styleUrls: ['./human-about-us.component.scss']
})
export class HumanAboutUsComponent implements OnInit{
  @Input() category: string;
  lang: string = '';

  routes = routes;

  video: any;
  brochure: any;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: AboutUsDataService,) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.title.setTitle(this.translate.instant('HOME_FRONT.HUMAN_CAPITAL') + ' - ' + this.translate.instant('SITE_NAME'));

    this.service.load({category: consts.human}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success) {
          const data = res.data;
          if (!!data['video'] && data['video'].length > 0) {
            let extension = '.' + data['video'].split('.').pop();
            this.video = {
              url: `${environment.assetsBaseUrl}${data['video']}`,
              name: data['originVideo'],
              mime: ext2mime[extension],
            };
          }
          if (!!data['brochure'] && data['brochure'].length > 0) {
            let extension = '.' + data['brochure'].split('.').pop();
            this.brochure = {
              url: `${environment.assetsBaseUrl}${data['brochure']}`,
              name: data['originBrochure'],
              mime: ext2mime[extension],
            };
          }
        } else {

        }
      });
  }

  onBrochureClicked() {
    this.service.getBrochure(this.brochure).pipe(first()).subscribe();
  }
}
