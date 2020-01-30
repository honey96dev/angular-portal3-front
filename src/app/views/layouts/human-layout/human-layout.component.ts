import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {TranslateService} from '@ngx-translate/core';
import {User} from '@app/_models';
import routes from '@core/routes';

// let authLayout;

@Component({
  selector: 'app-human-layout',
  templateUrl: './human-layout.component.html',
  styleUrls: ['./human-layout.component.scss']
})
export class HumanLayoutComponent implements OnInit {
  routes = routes;
  language: string;
  scrollDuration: number = 300;
  scrollEasing: string = 'easeInQuad';
  scrollOffset: number = 70;

  currentUser: User;
  myaccountUrl: string;

  @ViewChild('sidenav', {static: true}) public sidenav: any;

  constructor(private globalVariableService: GlobalVariableService,
              private router: Router,
              private translationService: TranslationService,
              private translate: TranslateService,
              private authService: AuthenticationService,) {
    // authLayout = this;
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

  clearSection() {
    this.globalVariableService.setSection('');
  }

  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }

  signOut() {
    this.authService.signOut();
    this.currentUser = this.authService.currentUserValue;
    // this.router.navigate(['/']);
  }

  onLanguageButtonClicked(lang) {
    this.language = lang;
    this.translationService.setLanguage(lang);
    this.globalVariableService.setLanguage(lang);
  }
}
