import { ComponentFactoryResolver, KeyValueDiffers, ViewContainerRef, ComponentRef } from '@angular/core';
export interface IComponentInjectorConfig {
    container: ViewContainerRef;
    component: any;
    inputs?: any;
    outputs?: any;
}
export declare class ComponentInjectorService {
    private componentFactoryResolver;
    private differs;
    constructor(componentFactoryResolver: ComponentFactoryResolver, differs: KeyValueDiffers);
    inject(config: IComponentInjectorConfig): Promise<ComponentRef<any>>;
    private _extendWithDetectChange(componentRef);
    private _injectPropertyBinds(config, componentRef);
}
