"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let ComponentInjectorService = class ComponentInjectorService {
    constructor(componentFactoryResolver, differs) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.differs = differs;
    }
    inject(config) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
        let componentRef = config.container.createComponent(componentFactory);
        this._extendWithDetectChange(componentRef);
        this._injectPropertyBinds(config, componentRef);
        componentRef.detectChanges();
        return Promise.resolve(componentRef);
    }
    _extendWithDetectChange(componentRef) {
        componentRef._differ = this.differs.find(componentRef.instance).create(componentRef.changeDetectorRef);
        componentRef.getChanges = () => {
            let changes = null;
            let diff = componentRef._differ.diff(componentRef.instance);
            if (diff) {
                diff.forEachItem((change) => {
                    if (changes === null) {
                        changes = {};
                    }
                    changes[change.key] = new core_1.SimpleChange(change.previousValue, change.currentValue);
                });
            }
            return changes;
        };
        componentRef.detectChanges = () => {
            if (typeof componentRef.instance.ngOnChanges === 'function') {
                let changes = componentRef.getChanges();
                if (changes) {
                    componentRef.instance.ngOnChanges(changes);
                }
            }
        };
    }
    _injectPropertyBinds(config, componentRef) {
        let propMetadata = Reflect.getOwnMetadata('propMetadata', config.component);
        for (let prop in propMetadata) {
            if (propMetadata[prop].length > 0) {
                propMetadata[prop].forEach((metadata) => {
                    switch (metadata.toString()) {
                        case '@Input':
                            if (config.inputs && config.inputs[prop]) {
                                componentRef.instance[prop] = config.inputs[prop];
                            }
                            else {
                                console.warn('Missing input [' + prop + '] for ' + config.component.name);
                            }
                            break;
                        case '@Output':
                            if (config.outputs && (typeof config.outputs[prop] === 'function')) {
                                componentRef.instance[prop].subscribe(config.outputs[prop]);
                            }
                            else {
                                console.warn('Missing output (' + prop + ') for ' + config.component.name);
                            }
                            break;
                    }
                });
            }
        }
    }
};
ComponentInjectorService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.KeyValueDiffers])
], ComponentInjectorService);
exports.ComponentInjectorService = ComponentInjectorService;
//# sourceMappingURL=component.injector.service.js.map