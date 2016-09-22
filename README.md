[![npm version](https://badge.fury.io/js/ng2-component-injector.svg)](https://badge.fury.io/js/ng2-component-injector)

# ng2-component-injector

Simple injector for angular 2 components. You just have to provide : container, component class, inputs and ouputs.
See example/ if needed.

## Install
```
npm install ng2-component-injector --save
```
```
@NgModule({
    providers: [ComponentInjectorService],
    entryComponents: [ /* Put here your components to be injected */  ],
})
export class AppModule { }
```

## Documentation
### ComponentInjectorService
```ts
inject(config: IComponentInjectorConfig):Promise<ComponentRef<any>>
```
Inject an angtular 2 component.

### IComponentInjectorConfig
```ts
export interface IComponentInjectorConfig {
  container:ViewContainerRef;
  component:any;
  inputs?:any;
  outputs?:any;
}
```

#### container: ViewContainerRef
The container where you want to inject your component.
Example: contentContainerRef
```html
<template #contentContainer></template>
```

```ts
 @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainerRef: ViewContainerRef;
```

#### component: any
The component to inject.
Example: MyComponent
```ts
 @Component({
  selector: 'my-component',
  template: '<span>my component</span>'
})
export class MyComponent {}
```

#### inputs: any (optional)
The list of inputs to bind. Example:
```ts
 {
    id: 13, // @Input() id:number;
    name: 'bob'
 }
```
#### outputs: any (optional)
The list of outputs to bind. Example:
```ts
 {
    onChange: () => { console.log('change'); } // @Ouput() onChange:EventEmiter = new EventEmitter();
 }
```

