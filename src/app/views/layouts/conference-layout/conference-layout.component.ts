import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';
import {User} from '@app/_models';

// let authLayout;

@Component({
  selector: 'app-conference-layout',
  templateUrl: './conference-layout.component.html',
  styleUrls: ['./conference-layout.component.scss']
})
export class ConferenceLayoutComponent implements OnInit {
  routes = routes;
  language: string;

  currentUser: User;

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
    window.scroll(0, 0);
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
