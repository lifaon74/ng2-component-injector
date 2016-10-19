import { Component, Input, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Ng2ComponentInjectorService } from './ng2-component-injector.service';

@Component({
  moduleId: module.id,
  selector: 'ng2-component-injector',
  template: `<template #contentContainer></template>`
})
export class Ng2ComponentInjectorComponent {
  @Input() config:any;

  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainerRef: ViewContainerRef;

  componentRef:ComponentRef<any>;

  constructor(
    private ng2ComponentInjectorService: Ng2ComponentInjectorService
  ) {
    // not empty
  }

  ngOnChanges() {
    if(this.config) {
      if(this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
      }

      this.config.container = this.contentContainerRef;
      this.ng2ComponentInjectorService.inject(this.config)
        .then((componentRef:ComponentRef<any>) => {
          this.componentRef = componentRef;
        });
    }
  }
}
