import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-shared-our-clients',
  templateUrl: './shared-our-clients.component.html',
  styleUrls: ['./shared-our-clients.component.scss']
})
export class SharedOurClientsComponent implements OnInit{
  @Input() category: string;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
