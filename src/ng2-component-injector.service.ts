import {
  ComponentFactoryResolver, KeyValueDiffers, ViewContainerRef, Injectable,
  SimpleChange, KeyValueChangeRecord, ComponentFactory, ComponentRef
} from '@angular/core';


export interface INg2ComponentInjectorConfig {
  container:ViewContainerRef;
  component:any;
  inputs?:any;
  outputs?:any;
}


@Injectable()
export class Ng2ComponentInjectorService {

  constructor(
    private componentFactoryResolver:ComponentFactoryResolver,
    private differs:KeyValueDiffers
  ) {
    // not empty
  }

  inject(config:INg2ComponentInjectorConfig):Promise<ComponentRef<any>> {

    let componentFactory:ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(config.component);
    let componentRef:any = config.container.createComponent(componentFactory);

    this._extendWithDetectChange(componentRef);
    this._injectPropertyBinds(config, componentRef);

    componentRef.detectChanges();

    return Promise.resolve(componentRef);
  }


  private _extendWithDetectChange(componentRef:any) {
    componentRef._differ = this.differs.find(componentRef.instance).create(componentRef.changeDetectorRef);

    componentRef.getChanges = () => {
      let changes:any = null;
      let diff = componentRef._differ.diff(componentRef.instance);
      if(diff) {
        diff.forEachItem((change:KeyValueChangeRecord) => {
          if(changes === null) { changes = {}; }
          changes[change.key] = new SimpleChange(change.previousValue, change.currentValue);
        });
      }
      return changes;
    };

    componentRef.detectChanges = () => {
      if(typeof componentRef.instance.ngOnChanges === 'function') {
        let changes:any = componentRef.getChanges();
        if(changes) {
          componentRef.instance.ngOnChanges(changes);
        }
      }
    };
  }

  private _injectPropertyBinds(config:INg2ComponentInjectorConfig, componentRef:any) {
    // http://stackoverflow.com/questions/34465214/access-meta-annotation-inside-class-typescript
    let propMetadata:any = (<any>Reflect).getOwnMetadata('propMetadata', config.component);
    for(let prop in propMetadata) {
      if(propMetadata[prop].length > 0) {
        propMetadata[prop].forEach((metadata:any) => {
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

}
