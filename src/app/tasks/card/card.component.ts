import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {RequestService} from '../../services/request.service';
import {DataProviderService} from '../../services/data-provider.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() task: TaskModel;
  disabled = true;
  isAdmin = false;

  edit() {
    this.disabled = false;
  }

  changeStatus() {
    this.task.status = this.task.status === 1 ? 0 : 1;
  }

  save() {
    this.request.edit(this.task.id, {
      text: this.task.text,
      status: this.task.status
    }).subscribe(
      (data) => {
        console.log('success');
      },
      (error) => {
        console.log(error, 'error');
      }
    );
    this.disabled = true;
  }

  constructor(private request: RequestService,
              private  dataProvideService: DataProviderService) {
  }

  ngOnInit() {
    this.isAdmin = this.dataProvideService.isAmin;
    this.dataProvideService.isLogin.subscribe(
      (data: boolean) => {
        this.isAdmin = data;
      }
    );
  }

}
