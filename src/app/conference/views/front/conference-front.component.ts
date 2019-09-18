import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';

@Component({
  selector: 'app-conference-front',
  templateUrl: './conference-front.component.html',
  styleUrls: ['./conference-front.component.scss']
})
export class ConferenceFrontComponent implements OnInit{
  consts = consts;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
      });
  }
}
