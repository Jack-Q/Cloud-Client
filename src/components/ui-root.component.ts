import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { MdDialog } from '@angular/material'
import { UiLoginComponent } from './ui-login.component'
import { LoginService } from '../service/service'
// any child components must be declared in the directives property.
// templateUrl should be specified from the root of the project.
@Component({
  moduleId: module.id,
  selector: 'ui-root',
  templateUrl: 'ui-root.component.html',
  styleUrls: ['ui-root.component.css']
})
export class UiRootComponent implements OnInit, AfterContentInit, AfterViewInit {
  showOverlay: boolean = true;
  constructor(
    private loginService: LoginService
  ) {
    if (!this.loginService.isLogin()) {
      setTimeout(() => this.openLoginBox(), 100);
    }
  }
  ngOnInit() {
  }

  ngAfterContentInit() { }


  ngAfterViewInit() {

  }

  openLoginBox() {
    this.showOverlay = true;
  }

  closeLoginBox() {
    this.showOverlay = false;
  }
}
