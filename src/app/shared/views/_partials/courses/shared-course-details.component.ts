import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {CoursesDataService} from '@app/shared/_services';
import {Course} from '@app/shared/_model';
import routes from '@core/routes';
import {first} from 'rxjs/operators';
import {environment} from '@environments/environment';
import ext2mime from '@core/ext2mime.json';
import consts from '@core/consts';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {User} from '@app/_models';

@Component({
  selector: 'app-shared-course-details',
  templateUrl: './shared-course-details.component.html',
  styleUrls: ['./shared-course-details.component.scss']
})
export class SharedCourseDetailsComponent implements OnInit{
  lang: string;

  routes = routes;

  id: string;
  data: Course;
  instructors: any[];

  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: CoursesDataService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');

    this.route.paramMap.subscribe(map => {
      this.id = map.get('id');
    });

    this.service.get({id: this.id}).pipe(first())
      .subscribe(res => {
        const {result, data} = res;
        if (result == consts.success) {
          let extension = '.' + data['media'].split('.').pop();
          data['media'] = `${environment.assetsBaseUrl}${data['media']}`;
          data['mime'] = ext2mime[extension];
          for (let instructor of data['instructors']) {
            extension = '.' + instructor['media'].split('.').pop();
            instructor['media'] = `${environment.assetsBaseUrl}${instructor['media']}`;
            instructor['mime'] = ext2mime[extension];
          }
          this.data = data;
          this.slides = this.chunk(data['instructors'], 3);
        } else {
          this.data = null;
        }
      });

  }

  goBack(params) {
    this.location.back();
  }
}
