import {Component, ElementRef, isDevMode, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, map, startWith} from 'rxjs/operators';
import {getCodeList} from 'country-list';
import consts from '@core/consts';
import routes from '@core/routes';
import {Country} from '@app/_models';
import {Observable} from 'rxjs';
import {IMyOptions, IOption} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-shared-auth-signup',
  templateUrl: './shared-auth-signup.component.html',
  styleUrls: ['./shared-auth-signup.component.scss']
})
export class SharedAuthSignupComponent implements OnInit {
  routes = routes;
  consts = consts;

  alert: {
    show: boolean,
    type: string,
    message: string
  } = {show: false, type: 'alert-danger', message: 'error message'};
  loading: boolean = false;

  lang: string;
  form: FormGroup;
  genders: Array<IOption> = [];
  countryCodes: Array<IOption> = [];
  public datePickerOptions: IMyOptions = {
    minYear: 1900,
  };

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.genders = [
      {value: consts.male, label: this.translate.instant('COMMON.GENDER.MALE'), icon: ''},
      {value: consts.female, label: this.translate.instant('COMMON.GENDER.FEMALE'), icon: ''},
    ];
    this.countryCodes = [
      {
        value: consts.PHONE_PREFIX_BAHRAIN,
        label: consts.PHONE_PREFIX_BAHRAIN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.BAHRAIN'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_KUWAIT,
        label: consts.PHONE_PREFIX_KUWAIT + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.KUWAIT'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_OMAN,
        label: consts.PHONE_PREFIX_OMAN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.OMAN'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_QATAR,
        label: consts.PHONE_PREFIX_QATAR + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.QATAR'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_SAUDI_ARABIA,
        label: consts.PHONE_PREFIX_SAUDI_ARABIA + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.SAUDI_ARABIA'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_UAE,
        label: consts.PHONE_PREFIX_UAE + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.UAE'),
        icon: ''
      },
    ];
    this.title.setTitle(this.translate.instant('SIGNIN.SIGNUP') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('SIGNIN.SIGNUP') + ' - ' + this.translate.instant('SITE_NAME'));
      });
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.lang = data;
        this.genders = [
          {value: consts.male, label: this.translate.instant('COMMON.GENDER.MALE'), icon: ''},
          {value: consts.female, label: this.translate.instant('COMMON.GENDER.FEMALE'), icon: ''},
        ];
        this.countryCodes = [
          {
            value: consts.PHONE_PREFIX_BAHRAIN,
            label: consts.PHONE_PREFIX_BAHRAIN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.BAHRAIN'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_KUWAIT,
            label: consts.PHONE_PREFIX_KUWAIT + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.KUWAIT'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_OMAN,
            label: consts.PHONE_PREFIX_OMAN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.OMAN'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_QATAR,
            label: consts.PHONE_PREFIX_QATAR + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.QATAR'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_SAUDI_ARABIA,
            label: consts.PHONE_PREFIX_SAUDI_ARABIA + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.SAUDI_ARABIA'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_UAE,
            label: consts.PHONE_PREFIX_UAE + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.UAE'),
            icon: ''
          },
        ];
      });

    // this.genders = [
    //   {value: consts.male, label: this.translate.instant('COMMON.GENDER.MALE')},
    //   {value: consts.female, label: this.translate.instant('COMMON.GENDER.FEMALE')},
    // ];

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      company: ['', [Validators.required]],
      city: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (isDevMode()) {
      this.f.email.patchValue('honey96dev@gmail.com');
      this.f.username.patchValue('honey96dev');
      this.f.firstName.patchValue('Zhenlong');
      this.f.fatherName.patchValue('Xuan');
      this.f.lastName.patchValue('Jin');
      this.f.gender.patchValue('M');
      this.f.birthday.patchValue(new Date().toISOString());
      this.f.jobTitle.patchValue('IT');
      this.f.sector.patchValue('Web');
      this.f.company.patchValue('Wangzi');
      // this.f.country.patchValue('China');
      this.f.city.patchValue('Hunchun');
      this.f.countryCode.patchValue('+966');
      this.f.phone.patchValue('571623415');
      this.f.password.patchValue('123456');
      this.f.password2.patchValue('123456');
    }
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const email = this.f.email.value;
    const username = this.f.username.value;
    const firstName = this.f.firstName.value;
    const fatherName = this.f.fatherName.value;
    const lastName = this.f.lastName.value;
    const gender = this.f.gender.value;
    const birthday = this.f.birthday.value;
    const jobTitle = this.f.jobTitle.value;
    const sector = this.f.sector.value;
    const company = this.f.company.value;
    const city = this.f.city.value;
    const countryCode = this.f.countryCode.value;
    const phone = this.f.phone.value;
    const password = this.f.password.value;
    // window.scrollTo(window.scrollX, 0);
    // const birthdayStr = birthday.toISOString().substr(0, 10);
    const birthdayStr = birthday;

    this.authService.signUp({
      email,
      username,
      firstName,
      fatherName,
      lastName,
      gender,
      birthday: birthdayStr,
      jobTitle,
      sector,
      company,
      city,
      countryCode,
      phone,
      password,
    })
      .pipe(first())
      .subscribe(res => {
        this.loading = false;
        const {result, message, params} = res;
        if (result === consts.success) {
          this.alert = {
            show: true,
            type: 'alert-success',
            message: message,
          };
        } else {
          this.alert = {
            show: true,
            type: 'alert-danger',
            message: message,
          };
        }
      }, error => {
        this.loading = false;
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      });
  }
}
