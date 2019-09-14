import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-business-front',
  templateUrl: './business-front.component.html',
  styleUrls: ['./business-front.component.scss']
})
export class BusinessFrontComponent implements OnInit{

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('HOME_FRONT.TITLE') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.TITLE') + ' - ' + this.translate.instant('SITE_NAME'));
      });
  }
}
