// App tests
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import 'rxjs/Rx';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());