import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first, map, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import consts from '@core/consts';
import {getCodeList} from 'country-list';
import {MyaccountService} from '@app/shared/_services';
import {Country, User} from '@app/_models';
import {Observable} from 'rxjs';
import {IMyOptions, IOption} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-shared-myaccount',
  templateUrl: './shared-myaccount.component.html',
  styleUrls: ['./shared-myaccount.component.scss']
})
export class SharedMyaccountComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;
  passwordForm: FormGroup;

  currentUser: User;
  countries: Country[] = [];
  countriesData: Observable<Country[]>;

  loading = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };
  lang: string;

  passwordLoading = false;
  passwordAlert = {
    show: false,
    type: '',
    message: '',
  };

  genders: Array<IOption> = [];
  countryCodes: Array<IOption> = [];
  public datePickerOptions: IMyOptions = {
    minYear: 1900,
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private service: MyaccountService,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    let title;
    switch (this.category) {
      case 'human':
        title = this.translate.instant('HOME_FRONT.HUMAN_CAPITAL') + ' - ' + this.translate.instant('SITE_NAME');
        break;
      case 'conference':
        title = this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME');
        break;
      case 'business':
        title = this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION') + ' - ' + this.translate.instant('SITE_NAME');
        break;
    }

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

    this.title.setTitle(title);
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(title);
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

    this.form = this.formBuilder.group({
      id: [''],
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
    });

    this.currentUser = this.authService.currentUserValue;
    this.f.id.patchValue(this.currentUser.id);
    this.f.email.patchValue(this.currentUser.email);
    this.f.username.patchValue(this.currentUser.username);
    this.f.firstName.patchValue(this.currentUser.firstName);
    this.f.fatherName.patchValue(this.currentUser.fatherName);
    this.f.lastName.patchValue(this.currentUser.lastName);
    this.f.gender.patchValue(this.currentUser.gender);
    this.f.birthday.patchValue(this.currentUser.birthday);
    this.f.jobTitle.patchValue(this.currentUser.jobTitle);
    this.f.sector.patchValue(this.currentUser.sector);
    this.f.company.patchValue(this.currentUser.company);
    this.f.city.patchValue(this.currentUser.city);
    this.f.countryCode.patchValue(this.currentUser.countryCode);
    this.f.phone.patchValue(this.currentUser.phone);

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  get passwordF() {
    return this.passwordForm.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  onSubmit() {
    const f = this.f;
    const id = f.id.value;
    const email = this.f.email.value;
    const username = this.f.username.value;
    const firstName = this.f.firstName.value;
    const fatherName = this.f.fatherName.value;
    const lastName = this.f.lastName.value;
    const gender = this.f.gender.value;
    const birthday = this.f.birthday.value || new Date().toISOString().substr(0, 10);
    const jobTitle = this.f.jobTitle.value;
    const sector = this.f.sector.value;
    const company = this.f.company.value;
    const city = this.f.city.value;
    const countryCode = this.f.countryCode.value;
    const phone = this.f.phone.value;

    // console.log(birthday);
    // const birthdayStr = birthday.toISOString().substr(0, 10);
    const birthdayStr = birthday;

    const data = {
      id,
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
    };

    this.loading = true;
    this.alert.show = false;

    this.service.save(data).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
          this.alert = {
            show: true,
            type: 'alert-success',
            message: res.message,
          };
          this.authService.changeCurrentUserValue(data);
        } else {
          this.alert = {
            show: true,
            type: 'alert-danger',
            message: res.message,
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

  changePassword() {
    const f = this.passwordF;
    const currentPassword = f.currentPassword.value;
    const password = f.password.value;

    const data = {id: this.currentUser.id, currentPassword, password,};

    this.passwordLoading = true;
    this.passwordAlert.show = false;

    this.service.changePassword(data).pipe(first())
      .subscribe(res => {
        this.passwordLoading = false;
        if (res.result == consts.success) {
          this.passwordAlert = {
            show: true,
            type: 'alert-success',
            message: res.message,
          };
          f.currentPassword.reset('');
          f.password.reset('');
          f.password2.reset('');
        } else {
          this.passwordAlert = {
            show: true,
            type: 'alert-danger',
            message: res.message,
          };
        }
      }, error => {
        this.passwordLoading = false;
        this.passwordAlert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      });
  }

  filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) >= 0);
  }
}
