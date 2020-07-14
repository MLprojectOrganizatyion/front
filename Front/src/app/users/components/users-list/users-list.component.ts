import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user.model';
import { UsersService } from '../../services/users.service';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const uploadAPI = 'http://localhost:4000/api/upload'; // better use a service class

@Component({
  selector: 'ci-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  columns: string[] = ['id', 'name', 'email', 'phone'];
  fileToUpload: File = null;
  @Input()
  users: User[];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  @Output()
  selectedUser: EventEmitter<User> = new EventEmitter<User>();



  constructor(private usersService: UsersService) {}


  title = 'ng8fileuploadexample';
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response);
         alert('Your file has been uploaded successfully');
    };
 }

/*   uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.usersService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });

  } */

  /*   onClick() {
      const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index];
          this.files.push({ data: file, inProgress: false, progress: 0 });
        }
        this.uploadFiles();
      };
      fileUpload.click();
    } */


  }











    /* 
    selectUser(user: User) {
      this.selectedUser.emit(user);
    } */

