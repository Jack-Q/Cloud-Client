import {Component, AfterViewInit} from '@angular/core';
import {LoginService} from '../service/service'

@Component({
  moduleId: module.id,
  selector: 'ui-left-panel',
  templateUrl: 'ui-left-panel.component.html',
  styleUrls: ['ui-left-panel.component.css']
})
export class UiLeftPanelComponent implements AfterViewInit{
  username: String;

  constructor(private loginService: LoginService) {
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

}