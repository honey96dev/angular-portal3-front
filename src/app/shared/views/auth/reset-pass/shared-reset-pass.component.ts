import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { isDevMode } from '@angular/core';
import consts from '@core/consts';
import routes from '@core/routes';

@Component({
  selector: 'app-shared-reset-pass',
  templateUrl: './shared-reset-pass.component.html',
  styleUrls: ['./shared-reset-pass.component.scss']
})
export class SharedResetPassComponent implements OnInit {
  routes = routes;

  alert: {
    show: boolean,
    type: string,
    message: string
  } = {show: false, type: 'alert-danger', message: 'error message'};
  isInvalid: boolean = false;
  loading: boolean = false;

  email: string;
  token: string;

  form: FormGroup;
  returnUrl: string;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('SIGNIN.FORGOT_PASSWORD') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('SIGNIN.FORGOT_PASSWORD') + ' - ' + this.translate.instant('SITE_NAME'));
      });

    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.route.paramMap.subscribe(map => {
      this.email = map.get("email");
      this.token = map.get("token");
      this.loading = true;
      this.authService.validateToken({email: this.email, token: this.token}).pipe(first())
        .subscribe(res => {
          this.loading = false;
          if (res.result !== consts.success) {
            this.isInvalid = true;
            this.alert = {
              show: true,
              type: 'alert-danger',
              message: res.message,
            }
          }
        }, error => {
          this.loading = false;
          this.isInvalid = true;
        })

    });

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

    const email = this.email;
    const token = this.token;
    const password = this.f.password.value;

    this.authService.resetPassword({
      email,
      token,
      password,
    })
      .pipe(first())
      .subscribe(res => {
        this.loading = false;
        const {result, message, params} = res;
        this.alert = {
          show: true,
          type: result === consts.success ? 'alert-success' : 'alert-danger',
          message: message,
        };
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
