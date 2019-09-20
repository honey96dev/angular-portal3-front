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

// var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
//   ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
//   ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
//   ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
//   ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
//   ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
//   ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
//   ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
//   ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
//   ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
//   ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
//   ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
//   ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
//   ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
//   ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

@Component({
  selector: 'app-shared-auth-signup',
  templateUrl: './shared-auth-signup.component.html',
  styleUrls: ['./shared-auth-signup.component.scss']
})
export class SharedAuthSignupComponent implements OnInit {
  routes = routes;

  alert: {
    show: boolean,
    type: string,
    message: string
  } = {show: false, type: 'alert-danger', message: 'error message'};
  loading: boolean = false;

  form: FormGroup;
  returnUrl: string;
  countries: Country[] = [];
  countriesData: Observable<Country[]>;

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
    this.title.setTitle(this.translate.instant('SIGNIN.SIGNUP') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('SIGNIN.SIGNUP') + ' - ' + this.translate.instant('SITE_NAME'));
      });

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
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

    if (isDevMode()) {
      this.f.email.patchValue('honey96dev@gmail.com');
      this.f.firstName.patchValue('Zhenlong');
      this.f.lastName.patchValue('Jin');
      this.f.password.patchValue('123456');
      this.f.password2.patchValue('123456');
      this.f.position.patchValue('Xin\'an');
      // this.f.country.patchValue('China');
      this.f.city.patchValue('Hunchun');
      this.f.phone.patchValue('+8618943750790');
    }

    const countries = getCodeList();
    let temp = [];
    Object.entries(countries).forEach(value => {
      temp.push({
        code: value[0],
        name: value[1],
      });
    });
    this.countries = temp;
    console.log(this.countries);
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  onDisplayValue(country?: Country): string | undefined {
    return country ? country.name : '';
  }

  filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) >= 0);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const email = this.f.email.value;
    const firstName = this.f.firstName.value;
    const lastName = this.f.lastName.value;
    const password = this.f.password.value;
    const position = this.f.position.value;
    const country = this.f.country.value;
    const city = this.f.city.value;
    const phone = this.f.phone.value;

    this.authService.signUp({
      email,
      firstName,
      lastName,
      password,
      position,
      country,
      city,
      phone,
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
      }
      , error => {
        this.loading = false;
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      }
      );
  }
}
