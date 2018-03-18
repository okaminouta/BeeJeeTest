import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnChanges {
  @Input() pages;
  pager = [];
  curentPage = 1;

  constructor(private request: RequestService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let num = 1; num <= this.pages; num++) {
      this.pager.push(num);
    }
  }

  sortBy(field: string = null, direction: string = null) {
    this.request.get(null, field, direction);
  }

  setPage(page: number) {
    this.curentPage = page;
    this.request.get(this.curentPage);
  }


  nextPage() {
    this.curentPage += 1;
    this.request.get(this.curentPage);
  }

  prevPage() {
    this.curentPage -= 1;
    this.request.get(this.curentPage);
  }

}
