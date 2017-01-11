import {
  ComponentFactoryResolver, ViewContainerRef, Injectable,
  ComponentFactory, ComponentRef,
  SimpleChange, KeyValueChangeRecord, KeyValueDiffers
} from '@angular/core';

declare const Reflect: any;

export interface Ng2ComponentInjectorConfig {
  container: ViewContainerRef;
  component: any;
  inputs?: any;
  outputs?: any;
}


@Injectable()
export class Ng2ComponentInjectorService {

  static injectPropertyBinds(config: Ng2ComponentInjectorConfig, componentRef: any) {

    // http://stackoverflow.com/questions/34465214/access-meta-annotation-inside-class-typescript
    let propMetadata: any = (<any>Reflect).getOwnMetadata('propMetadata', config.component);
    for(let prop in propMetadata) {
      if(propMetadata[prop].length > 0) {
        propMetadata[prop].forEach((metadata: any) => {
          switch(metadata.toString()) {
            case '@Input':
              if(config.inputs && config.inputs[prop]) {
                componentRef.instance[prop] = config.inputs[prop];
              } else {
                console.warn('Missing input [' + prop + '] for ' + config.component.name);
              }
              break;
            case '@Output':
              if(config.outputs && (typeof config.outputs[prop] === 'function')) {
                componentRef.instance[prop].subscribe(config.outputs[prop]);
              } else {
                console.warn('Missing output (' + prop + ') for ' + config.component.name);
              }
              break;
          }
        });
      }
    }
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private differs: KeyValueDiffers) {
    // not empty
  }

  create(config: Ng2ComponentInjectorConfig, index ?: number): ComponentRef<any> {

    let componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(config.component);
    let componentRef: any = config.container.createComponent(componentFactory, index);

    this._extendWithDetectChange(componentRef);
    Ng2ComponentInjectorService.injectPropertyBinds(config, componentRef);

    componentRef.detectChanges();

    return componentRef;
  }


  private _extendWithDetectChange(componentRef: any) {
    componentRef._differ = this.differs.find(componentRef.instance).create(componentRef.changeDetectorRef);

    componentRef.getChanges = () => {
      let changes: any = null;
      let diff = componentRef._differ.diff(componentRef.instance);
      if(diff) {
        diff.forEachItem((change: KeyValueChangeRecord) => {
          if(changes === null) {
            changes = {};
          }
          changes[change.key] = new SimpleChange(change.previousValue, change.currentValue);
        });
      }
      return changes;
    };

    componentRef.detectChanges = () => {
      if(typeof componentRef.instance.ngOnChanges === 'function') {
        let changes: any = componentRef.getChanges();
        if(changes) {
          componentRef.instance.ngOnChanges(changes);
        }
      }
    };
  }


}
