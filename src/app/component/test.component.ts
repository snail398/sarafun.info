import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `{{title}}<p>
  <select (change)="onChange($event.target.value)">
    <option *ngFor="let i of devices">{{i}}</option>
  </select>
  <select [ngModel]="selectedDevice" (ngModelChange)="onChange($event)" name="sel2">
    <option [value]="i" *ngFor="let i of devices">{{i}}</option>
  </select>
  {{selectedDevice}}
  <p>Note: the first select box does not update when the second select box
     is changed, since we are not using ngModel on the first select box.
  <p><select [ngModel]="selectedDeviceObj" (ngModelChange)="onChangeObj($event)" name="sel3">
    <option [ngValue]="i" *ngFor="let i of deviceObjects">{{i.name}}</option>
  </select>
  {{selectedDeviceObj | json}}
  `
  //directives: []
})
export class TestComponent {
  title = "Angular 2 RC.4 - select";
  devices = 'one two three'.split(' ');
  selectedDevice = 'two';
  deviceObjects = [{name: 1}, {name: 2}, {name: 3}];
  selectedDeviceObj = this.deviceObjects[1];
  //constructor() { console.clear(); }
  onChange(newValue) {
    console.log(newValue);
    this.selectedDevice = newValue;
    // ... do other stuff here ...
  }
  onChangeObj(newObj) {
    console.log(newObj);
    this.selectedDeviceObj = newObj;
    // ... do other stuff here ...
  }
}
