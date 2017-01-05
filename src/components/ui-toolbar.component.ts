import { Component, OnInit } from "@angular/core"
import { FileService } from "../service/service"
// const remote = require("electron").remote;
import { remote } from "electron";
import {UiFile} from '../model/model'
@Component({
    moduleId: module.id,
    selector: 'ui-toolbar',
    templateUrl: 'ui-toolbar.component.html',
    styleUrls: ['ui-toolbar.component.css']
})
export class UiToolbarComponent implements OnInit {

    constructor(private fileService: FileService) {
        
    }

    upload(): void{
        alert("upload");
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            title: "Select file to upload",
        }, filePath => {
            let file = new UiFile(filePath[0])
            file.path = filePath[0];
            this.fileService.uploadFile(file).then(file => {
                this.refresh();
            });
        });
    }

    refresh(): void{
        alert("refresh");
        this.fileService.refreshFileList();
    }

    ngOnInit() {
        
    }    
}