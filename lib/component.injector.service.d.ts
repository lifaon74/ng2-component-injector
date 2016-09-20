
import {
  ComponentFactoryResolver, KeyValueDiffers, ViewContainerRef, ComponentRef
} from '@angular/core';


export declare interface IComponentInjectorConfig {
  container:ViewContainerRef;
  component:any;
  inputs?:any;
  outputs?:any;
}


export declare class ComponentInjectorService {
  constructor(
    private componentFactoryResolver:ComponentFactoryResolver,
    private differs:KeyValueDiffers
  ) {
    // not empty
  }

  inject(config:IComponentInjectorConfig):Promise<ComponentRef<any>>;
}
