import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';

@Component({
  selector: 'app-business-contact-us',
  templateUrl: './business-contact-us.component.html',
  styleUrls: ['./business-contact-us.component.scss']
})
export class BusinessContactUsComponent implements OnInit{
  consts = consts;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
