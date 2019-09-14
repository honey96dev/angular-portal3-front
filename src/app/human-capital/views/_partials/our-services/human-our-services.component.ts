import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-our-services',
  templateUrl: './human-our-services.component.html',
  styleUrls: ['./human-our-services.component.scss']
})
export class HumanOurServicesComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
