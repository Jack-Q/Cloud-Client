import { Component, OnInit } from '@angular/core';
import { UiFile, UiFileIcon } from '../model/model'
import { FileService } from '../service/service'
import {remote} from 'electron'

@Component({
  moduleId: module.id,
  selector: 'ui-file-list',
  templateUrl: 'ui-file-list.component.html',
  styleUrls: ["ui-file-list.component.css"]
})
export class UiFileListComponent implements OnInit {
  files: UiFile[];
  selectedFile: UiFile;
  loading: boolean = true;
  displayMode: boolean = true;

  constructor(private fileService: FileService) {
    this.files = [];
    for (var i = 0; i < 10; i++) this.files.push(new UiFile(`File-${Math.random()}.txt`));
    this.files.forEach(e => {
      e.icon = ["Doc", "Music", "Video", "Zip", "Txt"][Math.floor(Math.random() * 5)] as UiFileIcon;
    })
    console.log(this.files);
    fileService.fileList.subscribe(f => this.files = f);
  }

  onSelect(file: UiFile) {
    this.selectedFile = file;
  }

  downloadFile(file: UiFile) {
    // alert("Download " + file.name);
    remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: `Save ${file.name} to ...`,
      defaultPath: `${file.name}`
    }, (name) => {
      file.path = name;
      this.fileService.downloadFile(file);
    });
  }
  
  deleteFile(file: UiFile) {
    this.fileService.deleteFile(file);
    // this.files = this.files.filter(h => h !== file);
    // if (this.selectedFile === file) {
    //   this.selectedFile = null;
    // }
  }

  ngOnInit() {
    this.fileService.getFileList().then(l => this.files = l).catch(e=>alert);
  }

}
