import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService, TranslationService} from '@app/_services';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-conference-about-us',
  templateUrl: './conference-about-us.component.html',
  styleUrls: ['./conference-about-us.component.scss']
})
export class ConferenceAboutUsComponent implements OnInit{
  @Input() category: string;
  lang: string = '';

  routes = routes;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private translation: TranslationService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
    this.translation.language.subscribe(lang => {
      this.lang = this.translate.instant('LANG');
      this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
    });
  }
}
