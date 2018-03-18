import {Component, OnInit} from '@angular/core';
import {DataProviderService} from '../services/data-provider.service';
import {RequestService} from '../services/request.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
  providers: []
})
export class TasksComponent implements OnInit {
  tasks = [];
  pages: number;

  constructor(private dataProviderService: DataProviderService,
              private request: RequestService) {
    this.request.get();
  }

  ngOnInit() {
    this.request.dataChange
      .subscribe(
        (data: any) => {
          this.tasks = data.tasks;
          this.pages = data.total_task_count / 3;
        }
      );
  }

}


