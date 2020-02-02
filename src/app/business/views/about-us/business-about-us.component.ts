import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService, TranslationService} from '@app/_services';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-business-about-us',
  templateUrl: './business-about-us.component.html',
  styleUrls: ['./business-about-us.component.scss']
})
export class BusinessAboutUsComponent implements OnInit{
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
    this.title.setTitle(this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION') + ' - ' + this.translate.instant('SITE_NAME'));
    this.translation.language.subscribe(lang => {
      this.lang = this.translate.instant('LANG');
      this.title.setTitle(this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION') + ' - ' + this.translate.instant('SITE_NAME'));
    });
  }
}
