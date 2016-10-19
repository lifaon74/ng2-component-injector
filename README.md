[![npm version](https://badge.fury.io/js/ng2-component-injector.svg)](https://www.npmjs.com/package/ng2-component-injector)

# ng2-component-injector

Simple injector for angular 2 components. You just have to provide : container, component class, inputs and ouputs.
See example/ if needed.

## Install
```
npm install ng2-component-injector --save
```
```ts
@NgModule({
    imports: [Ng2ComponentInjectorModule],
    entryComponents: [ /* Put here your components to be injected */  ],
})
export class AppModule { }
```

## Documentation
### Ng2ComponentInjectorService
```ts
inject(config: INg2ComponentInjectorConfig):Promise<ComponentRef<any>>
```
Inject an angular 2 component.

### INg2ComponentInjectorConfig
```ts
export interface INg2ComponentInjectorConfig {
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

### Ng2ComponentInjectorComponent
```html
<ng2-component-injector
    [config]="{
        component: myComponent,
        inputs: {
            id: 13
        }
    }"
></ng2-component-injector>
```
Inject an angular 2 component. The config is the same as `INg2ComponentInjectorConfig` exept that you don't need to provide a container.

