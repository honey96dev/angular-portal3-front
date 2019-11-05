import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-business-contact-us',
  templateUrl: './business-contact-us.component.html',
  styleUrls: ['./business-contact-us.component.scss']
})
export class BusinessContactUsComponent implements OnInit{
  consts = consts;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION') + ' - ' + this.translate.instant('SITE_NAME'));
      });
  }
}
