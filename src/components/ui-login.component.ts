import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material'
import {UiLoginStatus, LoginService} from '../service/service'

@Component({
    moduleId: module.id,
    selector: 'ui-login',
    templateUrl: 'ui-login.component.html',
    styleUrls: ["ui-login.component.css"]
})
export class UiLoginComponent implements OnInit {
    constructor(public dialogRef: MdDialogRef<UiLoginComponent>) {}

    ngOnInit() { }
}
