import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject'
import { Http } from '@angular/http'
import { UiFile } from '../model/model'
import {API_PORT} from '../config'
import 'rxjs/add/operator/toPromise';

const API_BASE = `http://localhost:${API_PORT}`;

@Injectable()
export class FileService {
    fileList: Subject<UiFile[]>;

    constructor(private http: Http) {
        this.fileList = new Subject<UiFile[]>();
     }

    getFileList(): Promise<UiFile[]> {
        return this.http.get(`${API_BASE}/list`).toPromise().then<UiFile[]>(
            resp => {
                let json = resp.json();
                if (json && json.success === true) {
                    let list = (json.response as Array<any>).map(f => {
                        let file = new UiFile(f.fileName);
                        file.uploadId = f.uploadId;
                        file.pieceCount = f.pieceCount;
                        return file;
                    })
                    this.updateFileList(list);
                    return list;
                }
            }
        )
    }

    deleteFile(file: UiFile): Promise<boolean> {
        return this.http.get(`${API_BASE}/delete/${encodeURIComponent(file.uploadId.toString())}`).toPromise().then<boolean>(
            resp => resp.json().success === true);
    }

    uploadFile(file: UiFile): Promise<boolean> {
        return this.http.get(`${API_BASE}/upload/${encodeURIComponent(file.path)}`).toPromise().then(
            resp => resp.json().success === true);
    }

    downloadFile(file: UiFile): Promise<boolean>{
        return this.http.get(`${API_BASE}/download/${encodeURIComponent(file.path)}/${encodeURIComponent(file.uploadId.toString())}`).toPromise().then(resp => resp.json().success === true);
    }

    updateFile():Promise<boolean> {
        return this.http.get(`${API_BASE}/update`).toPromise().then(resp=>resp.json().success === true);
    }

    refreshFileList() {
        this.getFileList();
    }

    private updateFileList(fileList: UiFile[]) {
        this.fileList.next(fileList);
    }
}