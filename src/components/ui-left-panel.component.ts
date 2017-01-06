import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http'
import {LoginService, FileService} from '../service/service'
import {API_PORT} from '../config'

@Component({
  moduleId: module.id,
  selector: 'ui-left-panel',
  templateUrl: 'ui-left-panel.component.html',
  styleUrls: ['ui-left-panel.component.css']
})
export class UiLeftPanelComponent implements AfterViewInit{
  username: String;
  isActive: boolean;

  constructor(private loginService: LoginService, private http: Http, private fileService: FileService ) {
    this.loginService.status.subscribe(s => {
      // update login status
      this.username = s.username;
    })
    this.fileService.activeStatus.subscribe(b => {
      this.isActive = b;
    });
  }

  ngAfterViewInit() {
  }

  showConfig() {
    alert("display config");
  }

  activeServer() {
    this.fileService.active();
  }

}