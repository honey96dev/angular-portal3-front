import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService, TranslationService} from '@app/_services';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import consts from '@core/consts';
import {first} from 'rxjs/operators';
import {environment} from '@environments/environment';
import ext2mime from '@core/ext2mime.json';
import {AboutUsDataService} from '@app/_services';

@Component({
  selector: 'app-conference-about-us',
  templateUrl: './conference-about-us.component.html',
  styleUrls: ['./conference-about-us.component.scss']
})
export class ConferenceAboutUsComponent implements OnInit{
  @Input() category: string;
  lang: string = '';

  routes = routes;

  video: any;
  brochure: any;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private translation: TranslationService,
              private service: AboutUsDataService,) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
    this.translation.language.subscribe(lang => {
      this.lang = this.translate.instant('LANG');
      this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
    });

    this.service.load({category: consts.conference}).pipe(first())
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
