import {Component, OnInit} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {TrainingDataService} from '@app/shared/_services';
import {User} from '@app/_models';

// let authLayout;

@Component({
  selector: 'app-business-layout',
  templateUrl: './business-layout.component.html',
  styleUrls: ['./business-layout.component.scss']
})
export class BusinessLayoutComponent implements OnInit {
  routes = routes;
  language: string;
  annualUpcoming: string = '';

  currentUser: User;

  constructor(private globalVariableService: GlobalVariableService,
              private router: Router,
              private translationService: TranslationService,
              private translate: TranslateService,
              private trainingService: TrainingDataService,
              private authService: AuthenticationService,) {
    // authLayout = this;
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.trainingService.annualUpcomingYear({}).pipe(first())
      .subscribe(res => {
        if (res.result === consts.success) {
          this.annualUpcoming = this.translate.instant('BUSINESS_LAYOUT.ANNUAL_UPCOMING2');
          // this.annualUpcoming = this.translate.instant('BUSINESS_LAYOUT.ANNUAL_UPCOMING', {year: res.data});
        } else {
          this.annualUpcoming = '';
        }
      }, error => {
        this.annualUpcoming = '';
      });
  }

  clearSection() {
    this.globalVariableService.setSection('');
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
