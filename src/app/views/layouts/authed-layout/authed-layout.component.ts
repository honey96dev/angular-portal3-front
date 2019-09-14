import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {Router} from '@angular/router';
import routes from '@core/routes';
import {MDBModalRef, MDBModalService} from 'ng-uikit-pro-standard';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';

@Component({
  selector: 'app-authed-layout',
  templateUrl: './authed-layout.component.html',
  styleUrls: ['./authed-layout.component.scss']
})
export class AuthedLayoutComponent implements OnInit {
  routes = routes;
  route: string;
  navbarTitle: string = '';
  // prices: {};
  price: 0;
  direction: 1;
  modalRef: MDBModalRef;
  username: string = '';
  firstName: string = '';
  lastName: string = '';

  connecting = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };

  @ViewChild('sidenav', {static: true}) public sidenav: any;

  constructor(private authService: AuthenticationService,
              private globalVariableService: GlobalVariableService,
              private modalService: MDBModalService,
              private router: Router) {
    // authLayout = this;
  }

  ngOnInit() {
    this.route = this.router.url;
    this.globalVariableService.getNavbarTitle()
      .subscribe(title => this.navbarTitle = title);
  }

  onClickNav(route) {
    this.route = route;
  }

  onSignOut() {
    const modalOptions = {
      class: 'modal-dialog-centered',
    };

    this.modalRef = this.modalService.show(QuestionModalComponent, modalOptions);
    this.modalRef.content.yesButtonColor = 'danger';
    this.modalRef.content.yesButtonClicked.subscribe(() => {
      this.authService.signOut();
      this.router.navigate([routes.auth]);
    });
  }
}
