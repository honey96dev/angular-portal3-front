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
  selector: 'app-shared-course-join',
  templateUrl: './shared-course-join.component.html',
  styleUrls: ['./shared-course-join.component.scss']
})
export class SharedCourseJoinComponent implements OnInit{
  lang: string;

  routes = routes;

  id: string;
  data: Course;
  instructors: any[];
  loading: boolean = false;
  submitted: boolean = false;
  user: User;

  form: FormGroup;

  alert: {
    show: boolean,
    type: string,
    message: string
  } = {show: false, type: 'alert-danger', message: 'error message'};

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

    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      jobTitle: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    this.user = this.authService.currentUserValue;
    this.f.firstName.patchValue(this.user.firstName);
    this.f.lastName.patchValue(this.user.lastName);
    this.f.country.patchValue(this.user.country);
    this.f.city.patchValue(this.user.city);
    this.f.company.patchValue(this.user.company);
    // this.f.jobTitle.patchValue(this.user.lastName);
    this.f.email.patchValue(this.user.email);
    this.f.phone.patchValue(this.user.phone);
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  goBack(params) {
    this.location.back();
  }

  submit() {
    this.loading = true;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const jobTitle = this.f.jobTitle.value;

    const params = {target: this.data.id, userId: this.user.id, jobTitle, email: this.f.email.value};

    this.service.join(params).pipe(first())
      .subscribe(res => {
        const {result, message} = res;
        this.alert = {
          show: true,
          type: result == consts.success ? 'alert-success' : 'alert-danger',
          message: message,
        };
        this.loading = false;
      }, error => {
        this.loading = false;
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
        this.loading = false;
      });
  }
}
