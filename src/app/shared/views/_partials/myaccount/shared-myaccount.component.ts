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


  passwordLoading = false;
  passwordAlert = {
    show: false,
    type: '',
    message: '',
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
    this.title.setTitle(title);
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(title);
      });

    this.form = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      position: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.countriesData = this.f.country.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.countries.slice())
      );

    const countries = getCodeList();
    let temp = [];
    Object.entries(countries).forEach(value => {
      temp.push({
        code: value[0],
        name: value[1],
      });
    });
    this.countries = temp;

    this.currentUser = this.authService.currentUserValue;
    this.f.id.patchValue(this.currentUser.id);
    this.f.firstName.patchValue(this.currentUser.firstName);
    this.f.lastName.patchValue(this.currentUser.lastName);
    this.f.company.patchValue(this.currentUser.company);
    this.f.position.patchValue(this.currentUser.position);
    this.f.country.patchValue(this.currentUser.country);
    this.f.city.patchValue(this.currentUser.city);
    this.f.email.patchValue(this.currentUser.email);
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
    const firstName = f.firstName.value;
    const lastName = f.lastName.value;
    const company = f.company.value;
    const position = f.position.value;
    const country = f.country.value;
    const city = f.city.value;
    const email = f.email.value;
    const phone = f.phone.value;

    const data = {
      id, firstName, lastName, company, position, country, city, email, phone
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
