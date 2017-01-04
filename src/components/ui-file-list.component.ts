import { Component } from '@angular/core';
import { UiFile } from '../model/model'

@Component({
  moduleId: module.id,
  selector: 'ui-file-list',
  templateUrl: 'ui-file-list.component.html',
  styleUrls: ["ui-file-list.component.css"]
})
export class UiFileListComponent {
  files: UiFile[];
  selectedFile: UiFile;
  loading: boolean = true;
  displayMode: boolean = true;

  constructor() {
    this.files = [];
    for (var i = 0; i < 10; i++) this.files.push( new UiFile(`File-${Math.random()}.txt`));
    console.log(this.files);
  }

  onSelect(file: UiFile) {
    this.selectedFile = file;
  }

  downloadFile(file: UiFile) {
    alert("Download " + file.name);
  }
  
  deleteFile(file: UiFile) {
    this.files = this.files.filter(h => h !== file);
    if (this.selectedFile === file) {
      this.selectedFile = null;
    }
  }


}
