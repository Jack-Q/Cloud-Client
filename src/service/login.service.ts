import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { API_PORT } from '../config'

export interface UiLoginStatus {
    type: "login" | "register";
    success: boolean;
    username: string;
    password: string;
}

@Injectable()
export class LoginService {
    status: Subject<UiLoginStatus>;
    currentStatus: UiLoginStatus;
    constructor(private http: Http) {
        this.status = new Subject<UiLoginStatus>();
        this.status.subscribe(s => this.currentStatus = s);
        try {
            let status = JSON.parse(localStorage.getItem("ui-login-status")) as UiLoginStatus;
            if (!status || !status.username) throw 1;
            status.success = false;
            this.status.next(status);
        } catch (e) {
            this.status.next({
                type: "login",
                success: false,
                username: "",
                password: ""
            });
        }
    }

    isLogin(): boolean {
        return this.currentStatus.success;
    }

    login(status: UiLoginStatus, callback: (result: boolean) => void) {
        this.http.get(`http://localhost:${API_PORT}/login/${encodeURIComponent(status.username)}/${encodeURIComponent(status.password)}`).subscribe(resp => {
            let json = resp.json();
            if (json.success) {
                console.log(json.response);
                status.success = true;
                status.type = "login";
                this.status.next(status);
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    register(status: UiLoginStatus, callback: (result: boolean) => void) {
        this.http.get(`http://localhost:${API_PORT}/register/${encodeURIComponent(status.username)}/${encodeURIComponent(status.password)}`).subscribe(resp => {
            let json = resp.json();
            if (json.success) {
                console.log(json.response);
                status.success = true;
                status.type = "login";
                this.login(status, callback);
            } else {
                callback(false);
            }
        });
    }
}
