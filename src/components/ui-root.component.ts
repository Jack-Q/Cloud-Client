import {Component} from '@angular/core';

// any child components must be declared in the directives property.
// templateUrl should be specified from the root of the project.
@Component({
  moduleId: module.id,
  selector: 'ui-root',
  templateUrl: 'ui-root.component.html',
  styleUrls: ['ui-root.component.css']
})
export class UiRootComponent {

}
