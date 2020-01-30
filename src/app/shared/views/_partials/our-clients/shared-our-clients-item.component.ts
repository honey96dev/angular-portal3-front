import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {OurClientsDataService} from '@app/shared/_services';
import routes from '@core/routes';
import {first} from 'rxjs/operators';
import consts from '@core/consts';
import {environment} from '@environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-our-clients-item',
  templateUrl: './shared-our-clients-item.component.html',
  styleUrls: ['./shared-our-clients-item.component.scss']
})
export class SharedOurClientsItemComponent implements OnInit{
  lang: string;

  routes = routes;

  title: string;
  data: any = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: OurClientsDataService,
              private location: Location) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.title = this.translate.instant('SHARED_OUR_CLIENTS.DETAILS');

    this.route.paramMap.subscribe(params => {
      this.service.get({id: params.get('id')}).pipe(first())
        .subscribe(res => {
          if (res.result === consts.success) {
            this.data = res.data;
            this.data['media'] = environment.assetsBaseUrl + this.data.photo;
          } else {

          }
        }, error => {

        });
    });

  }

  goBack() {
    this.location.back();
  }
}
