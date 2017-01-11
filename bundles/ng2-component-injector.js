!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], ["3"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", ["3"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate, __metadata, core_1, Ng2ComponentInjectorService, Ng2ComponentInjectorService_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            Ng2ComponentInjectorService = Ng2ComponentInjectorService_1 = (function () {
                function Ng2ComponentInjectorService(componentFactoryResolver, differs) {
                    this.componentFactoryResolver = componentFactoryResolver;
                    this.differs = differs;
                    // not empty
                }
                Ng2ComponentInjectorService.injectPropertyBinds = function (config, componentRef) {
                    // http://stackoverflow.com/questions/34465214/access-meta-annotation-inside-class-typescript
                    var propMetadata = Reflect.getOwnMetadata('propMetadata', config.component);
                    var _loop_1 = function (prop) {
                        if (propMetadata[prop].length > 0) {
                            propMetadata[prop].forEach(function (metadata) {
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
                    };
                    for (var prop in propMetadata) {
                        _loop_1(prop);
                    }
                };
                Ng2ComponentInjectorService.prototype.create = function (config, index) {
                    var componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
                    var componentRef = config.container.createComponent(componentFactory, index);
                    this._extendWithDetectChange(componentRef);
                    Ng2ComponentInjectorService_1.injectPropertyBinds(config, componentRef);
                    componentRef.detectChanges();
                    return componentRef;
                };
                Ng2ComponentInjectorService.prototype._extendWithDetectChange = function (componentRef) {
                    componentRef._differ = this.differs.find(componentRef.instance).create(componentRef.changeDetectorRef);
                    componentRef.getChanges = function () {
                        var changes = null;
                        var diff = componentRef._differ.diff(componentRef.instance);
                        if (diff) {
                            diff.forEachItem(function (change) {
                                if (changes === null) {
                                    changes = {};
                                }
                                changes[change.key] = new core_1.SimpleChange(change.previousValue, change.currentValue);
                            });
                        }
                        return changes;
                    };
                    componentRef.detectChanges = function () {
                        if (typeof componentRef.instance.ngOnChanges === 'function') {
                            var changes = componentRef.getChanges();
                            if (changes) {
                                componentRef.instance.ngOnChanges(changes);
                            }
                        }
                    };
                };
                return Ng2ComponentInjectorService;
            }());
            exports_1("Ng2ComponentInjectorService", Ng2ComponentInjectorService);
            exports_1("Ng2ComponentInjectorService", Ng2ComponentInjectorService = Ng2ComponentInjectorService_1 = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
                    core_1.KeyValueDiffers])
            ], Ng2ComponentInjectorService));
        }
    };
});

$__System.register("4", ["3", "2"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate, __metadata, core_1, ng2_component_injector_service_1, Ng2ComponentInjectorComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_component_injector_service_1_1) {
                ng2_component_injector_service_1 = ng2_component_injector_service_1_1;
            }
        ],
        execute: function () {
            __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            Ng2ComponentInjectorComponent = (function () {
                function Ng2ComponentInjectorComponent(ng2ComponentInjectorService) {
                    this.ng2ComponentInjectorService = ng2ComponentInjectorService;
                    // not empty
                }
                Ng2ComponentInjectorComponent.prototype.ngOnChanges = function () {
                    if (this.config) {
                        if (this.componentRef) {
                            this.componentRef.destroy();
                            this.componentRef = null;
                        }
                        this.config.container = this.contentContainerRef;
                        this.componentRef = this.ng2ComponentInjectorService.create(this.config);
                    }
                };
                return Ng2ComponentInjectorComponent;
            }());
            exports_1("Ng2ComponentInjectorComponent", Ng2ComponentInjectorComponent);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], Ng2ComponentInjectorComponent.prototype, "config", void 0);
            __decorate([
                core_1.ViewChild('contentContainer', { read: core_1.ViewContainerRef }),
                __metadata("design:type", core_1.ViewContainerRef)
            ], Ng2ComponentInjectorComponent.prototype, "contentContainerRef", void 0);
            exports_1("Ng2ComponentInjectorComponent", Ng2ComponentInjectorComponent = __decorate([
                core_1.Component({
                    moduleId: module.id,
                    selector: 'ng2-component-injector',
                    template: "<template #contentContainer></template>"
                }),
                __metadata("design:paramtypes", [ng2_component_injector_service_1.Ng2ComponentInjectorService])
            ], Ng2ComponentInjectorComponent));
        }
    };
});

$__System.register("1", ["3", "2", "4"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate, __metadata, core_1, ng2_component_injector_service_1, ng2_component_injector_component_1, Ng2ComponentInjectorModule;
    var exportedNames_1 = {
        "Ng2ComponentInjectorModule": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
                exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_component_injector_service_1_1) {
                ng2_component_injector_service_1 = ng2_component_injector_service_1_1;
                exportStar_1(ng2_component_injector_service_1_1);
            },
            function (ng2_component_injector_component_1_1) {
                ng2_component_injector_component_1 = ng2_component_injector_component_1_1;
                exportStar_1(ng2_component_injector_component_1_1);
            }
        ],
        execute: function () {
            __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            Ng2ComponentInjectorModule = (function () {
                function Ng2ComponentInjectorModule() {
                }
                return Ng2ComponentInjectorModule;
            }());
            exports_1("Ng2ComponentInjectorModule", Ng2ComponentInjectorModule);
            exports_1("Ng2ComponentInjectorModule", Ng2ComponentInjectorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        ng2_component_injector_component_1.Ng2ComponentInjectorComponent
                    ],
                    providers: [
                        ng2_component_injector_service_1.Ng2ComponentInjectorService
                    ],
                    exports: [
                        ng2_component_injector_component_1.Ng2ComponentInjectorComponent
                    ]
                }),
                __metadata("design:paramtypes", [])
            ], Ng2ComponentInjectorModule));
        }
    };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});