// module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'
import { HttpModule } from '@angular/http'
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';

import { UiRootComponent } from './ui-root.component';
import { UiLeftPanelComponent } from './ui-left-panel.component'
import { UiFileListComponent } from './ui-file-list.component';
import { UiToolbarComponent } from './ui-toolbar.component';
import { UiLoginComponent } from './ui-login.component'

import { FileService, LoginService } from '../service/service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, MaterialModule.forRoot()],
  declarations: [UiRootComponent, UiLoginComponent, UiFileListComponent, UiLeftPanelComponent, UiToolbarComponent],
  bootstrap: [UiRootComponent, UiLoginComponent],
  providers: [FileService, LoginService]
})
export class UiModule { }