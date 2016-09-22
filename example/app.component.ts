import {Component, ViewChild, OnChanges, AfterViewInit, ViewContainerRef, Input} from '@angular/core';
import {ComponentInjectorService} from '../lib/component.injector.service';


@Component({
  selector: 'my-component',
  template: '<span>my component : {{ input }}</span>'
})
export class MyComponent implements OnChanges {
  @Input() input:string;

  ngOnChanges() {
    console.log(this.input);
  }
}



@Component({
  selector: 'sav-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainerRef: ViewContainerRef;

  constructor(public componentInjectorService:ComponentInjectorService) {

  }


  ngAfterViewInit() {
    this.componentInjectorService.inject({
      container: this.contentContainerRef,
      component: MyComponent,
      inputs: {
        input: 'hello'
      }
    });
  }
}
