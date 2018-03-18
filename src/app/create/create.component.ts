import {Component, OnInit} from '@angular/core';
import {ImageResult, Options} from 'ngx-image2dataurl';
import {RequestService} from '../services/request.service';
import {unescape} from 'querystring';
import {TaskModel} from '../models/task.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  username: string;
  email: string;
  text: string;
  fileToUpload: File = null;
  src: any;
  task: any = undefined;

  constructor(private request: RequestService) {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  options: Options = {
    resize: {
      maxHeight: 320,
      maxWidth: 240
    },
    allowedExtensions: ['JPG', 'PnG', 'GIF']
  };

  ngOnInit() {
  }

  selected(imageResult: ImageResult) {
    if (imageResult.error) {
      console.log(imageResult.error);
    } else {
      this.src = imageResult.resized
        && imageResult.resized.dataURL
        || imageResult.dataURL;
    }
  }


  preview() {
    this.task = new TaskModel(this.username, this.email, -1, this.text, 0, this.src);
    console.log(this.task);
  }

  create() {
    const form = new FormData();
    form.append('username', this.username);
    form.append('email', this.email);
    form.append('text', this.text);
    form.append('image', this.fileToUpload, 'pic');
    this.request.create(form).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
