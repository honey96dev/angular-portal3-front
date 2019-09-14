import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';

// let authLayout;

@Component({
  selector: 'app-business-layout',
  templateUrl: './business-layout.component.html',
  styleUrls: ['./business-layout.component.scss']
})
export class BusinessLayoutComponent implements OnInit {
  routes = routes;
  language: string;
  scrollDuration: number = 650;
  scrollEasing: string = 'easeInQuad';
  scrollOffset: number = -66;

  @ViewChild('sidenav', {static: true}) public sidenav: any;

  constructor(private globalVariableService: GlobalVariableService,
              private router: Router,
              private translationService: TranslationService,
              private translate: TranslateService) {
    // authLayout = this;
  }

  ngOnInit() {

  }

  onLanguageButtonClicked() {
    let lang = this.translationService.getSelectedLanguage();
    lang = lang === 'en' ? 'ar' : 'en';
    this.translationService.setLanguage(lang);
    this.globalVariableService.setLanguage(lang);
  }

  clearSection() {
    this.globalVariableService.setSection('');
  }
}
