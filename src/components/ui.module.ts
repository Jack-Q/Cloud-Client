// module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UiRootComponent} from './ui-root.component';
import {UiFileListComponent }from './ui-file-list.component';

@NgModule({
  exports: [UiRootComponent, UiFileListComponent],
  imports: [BrowserModule],
  declarations: [UiRootComponent, UiFileListComponent],
  bootstrap: [UiRootComponent]
})
export class UiModule {}