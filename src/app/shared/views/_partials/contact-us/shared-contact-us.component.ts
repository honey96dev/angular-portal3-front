import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactUsDataService} from '@app/shared/_services';
import {first} from 'rxjs/operators';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {MDBModalRef, MDBModalService} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-shared-contact-us',
  templateUrl: './shared-contact-us.component.html',
  styleUrls: ['./shared-contact-us.component.scss']
})
export class SharedContactUsComponent implements OnInit{
  @Input() category: string;
  consts = consts;
  modalRef: MDBModalRef;

  form: FormGroup;
  loading: boolean = false;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: ContactUsDataService,
              private modalService: MDBModalService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.loading = true;
    const category = this.category;
    const name = this.f.name.value;
    const email = this.f.email.value;
    const subject = this.f.subject.value;
    const message = this.f.message.value;

    const params = {category, name, email, subject, message};
    this.service.post(params).pipe(first())
      .subscribe(res => {
        this.loading = false;
        const modalOptions = {
          class: 'modal-dialog-centered',
        };

        this.modalRef = this.modalService.show(AlertModalComponent, modalOptions);
        this.modalRef.content.title = this.translate.instant('SHARED_CONTACT_US.TITLE');
        this.modalRef.content.message = this.translate.instant(res.message);
        this.modalRef.content.yesButtonColor = res.result === consts.success ? 'primary' : 'danger';
        if (res.result === consts.success) {
          // this.f.name.patchValue('');
          // this.f.email.patchValue('');
          // this.f.subject.patchValue('');
          // this.f.message.patchValue('');

          this.f.name.reset('');
          this.f.email.reset('');
          this.f.subject.reset('');
          this.f.message.reset('');
        }
      }, error => {
        this.loading = false;
        const modalOptions = {
          class: 'modal-dialog-centered',
        };

        this.modalRef = this.modalService.show(AlertModalComponent, modalOptions);
        this.modalRef.content.title = this.translate.instant('SHARED_CONTACT_US.TITLE');
        this.modalRef.content.message = this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR');
        this.modalRef.content.yesButtonColor = 'danger';
      });
  }
}
