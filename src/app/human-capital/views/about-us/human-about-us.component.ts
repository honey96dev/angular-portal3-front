import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-human-about-us',
  templateUrl: './human-about-us.component.html',
  styleUrls: ['./human-about-us.component.scss']
})
export class HumanAboutUsComponent implements OnInit{
  @Input() category: string;
  lang: string = '';

  routes = routes;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.title.setTitle(this.translate.instant('HOME_FRONT.HUMAN_CAPITAL') + ' - ' + this.translate.instant('SITE_NAME'));
  }
}
