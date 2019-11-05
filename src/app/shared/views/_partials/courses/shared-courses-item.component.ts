import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import {CoursesDataService, EventsDataService} from '@app/shared/_services';
import {Course, Event} from '@app/shared/_model';
import routes from '@core/routes';

@Component({
  selector: 'app-shared-courses-item',
  templateUrl: './shared-courses-item.component.html',
  styleUrls: ['./shared-courses-item.component.scss']
})
export class SharedCoursesItemComponent implements OnInit{
  @Input() scope: string;
  @Input() bigPostImage: boolean;
  @Input() data: Course;
  @Input() lang: string;

  routes = routes;

  showMore: boolean = false;
  shortSummaryEn: string;
  shortSummaryAr: string;
  summaryBreak: number = 200;
  minified: boolean;

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: CoursesDataService) {
  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    this.shortSummaryEn = this.data.summaryEn.length > this.summaryBreak ? this.data.summaryEn.substr(0, this.summaryBreak) + '...' : this.data.summaryEn;
    this.shortSummaryAr = this.data.summaryAr.length > this.summaryBreak ? this.data.summaryAr.substr(0, this.summaryBreak) + '...' : this.data.summaryAr;
    if (this.lang == 'en') {
      this.minified = this.data.summaryEn.length > this.summaryBreak;
    } else {
      this.minified = this.data.summaryAr.length > this.summaryBreak;
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  setEditableRow() {
    this.service.setEditableRow(this.data);
  }
}
