// module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';

import { UiRootComponent } from './ui-root.component';
import { UiLeftPanelComponent } from './ui-left-panel.component'
import { UiFileListComponent } from './ui-file-list.component';
import { UiToolbarComponent } from './ui-toolbar.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule.forRoot()],
  declarations: [UiRootComponent, UiFileListComponent, UiLeftPanelComponent, UiToolbarComponent],
  bootstrap: [UiRootComponent]
})
export class UiModule { }