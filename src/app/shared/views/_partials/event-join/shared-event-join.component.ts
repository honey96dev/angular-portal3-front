import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import consts from '@core/consts';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactUsDataService, EventsDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {Event} from '@app/shared/_model';
import {MDBModalRef, MDBModalService} from 'ng-uikit-pro-standard';
import {environment} from '@environments/environment';
import ext2mime from '@core/ext2mime.json';
import {User} from '@app/_models';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-event-join',
  templateUrl: './shared-event-join.component.html',
  styleUrls: ['./shared-event-join.component.scss']
})
export class SharedEventJoinComponent implements OnInit{
  @Input() scope: string;
  consts = consts;
  modalRef: MDBModalRef;

  lang: string;
  id: string;
  data: Event;
  user: User;

  form: FormGroup;

  alert: {
    show: boolean,
    type: string,
    message: string
  } = {show: false, type: 'alert-danger', message: 'error message'};
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: EventsDataService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private modalService: MDBModalService,
              private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
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
    this.data = this.service.editableRowValue();
    this.route.paramMap.subscribe(map => {
      this.id = map.get('id');
    });
    if (!this.data) {
      this.service.get({scope: this.scope, id: this.id}).pipe(first())
        .subscribe(res => {
          const {result, data} = res;
          if (result == consts.success) {
            let extension = '.' + data['media'].split('.').pop();
            data['media'] = `${environment.assetsBaseUrl}${data['media']}`;
            data['mime'] = ext2mime[extension];
            this.data = data;
          } else {
            this.data = null;
          }
        });
    }
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

  submit() {
    this.loading = true;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    // const firstName = this.f.firstName.value;
    // const lastName = this.f.lastName.value;
    // const country = this.f.country.value;
    // const city = this.f.city.value;
    // const company = this.f.company.value;
    const jobTitle = this.f.jobTitle.value;
    // const email = this.f.email.value;
    // const phone = this.f.phone.value;

    // const params = {firstName, lastName, country, city, company, email, phone, target: this.data.id};
    const params = {target: this.data.id, userId: this.user.id, jobTitle};

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

  closeAlert() {
    this.alert.show = false;
  }

  goBack(params) {
    this.location.back();
  }
}
