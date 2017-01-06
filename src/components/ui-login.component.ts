import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiLoginStatus, LoginService } from '../service/service'
import { remote } from 'electron'
@Component({
    moduleId: module.id,
    selector: 'ui-login',
    templateUrl: 'ui-login.component.html',
    styleUrls: ["ui-login.component.css"]
})
export class UiLoginComponent implements OnInit {
    processing: boolean = false;
    loginStatus: UiLoginStatus;
    username: string = "";
    password: string = "";

    @Output("authFinish")
    authFinish = new EventEmitter();


    constructor(private loginServie: LoginService) {
        this.loginStatus = loginServie.currentStatus;
    }

    ngOnInit() { }

    login() {
        if (!!this.username && !!this.password) {
            this.processing = true;
            this.loginStatus.username = this.username;
            this.loginStatus.password = this.password;
            this.loginServie.login(this.loginStatus, result => {
                if (result) {
                    this.processing = false;
                    this.authFinish.emit();
                } else {
                    alert("Login failed");
                    this.processing = false;
                }
            })
        }
    }

    register() {
        if (!!this.username && !!this.password) {
            this.processing = true;
            this.loginStatus.username = this.username;
            this.loginStatus.password = this.password;
            this.loginServie.register(this.loginStatus, result => {
                if (result) {
                    this.processing = false;
                    this.authFinish.emit();
                } else {
                    alert("Register failed");
                    this.processing = false;
                }
            })
        }
    }

    exit() {
        // close current window
        remote.getCurrentWindow().close();
    }
}
