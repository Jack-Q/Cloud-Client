import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http'
import {LoginService} from '../service/service'

@Component({
  moduleId: module.id,
  selector: 'ui-left-panel',
  templateUrl: 'ui-left-panel.component.html',
  styleUrls: ['ui-left-panel.component.css']
})
export class UiLeftPanelComponent implements AfterViewInit{
  username: String;

  constructor(private loginService: LoginService, private http: Http) {
    this.loginService.status.subscribe(s => {
      // update login status
      this.username = s.username;
    })
  }

  ngAfterViewInit() {
  }

  showConfig() {
    alert("display config");
  }

  activeServer() {
    this.http.get(`http://localhost:12345/active`).subscribe(() => {
      
    });
  }

}