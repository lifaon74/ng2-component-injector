!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], ["3"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", ["3"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var Ng2ComponentInjectorService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("Ng2ComponentInjectorService", Ng2ComponentInjectorService = (function () {
                function Ng2ComponentInjectorService(componentFactoryResolver, differs) {
                    this.componentFactoryResolver = componentFactoryResolver;
                    this.differs = differs;
                    // not empty
                }
                Ng2ComponentInjectorService.prototype.inject = function (config) {
                    var componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
                    var componentRef = config.container.createComponent(componentFactory);
                    this._extendWithDetectChange(componentRef);
                    this._injectPropertyBinds(config, componentRef);
                    componentRef.detectChanges();
                    return Promise.resolve(componentRef);
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
                Ng2ComponentInjectorService.prototype._injectPropertyBinds = function (config, componentRef) {
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
                Ng2ComponentInjectorService.decorators = [
                    { type: core_1.Injectable },
                ];
                /** @nocollapse */
                Ng2ComponentInjectorService.ctorParameters = [
                    { type: core_1.ComponentFactoryResolver, },
                    { type: core_1.KeyValueDiffers, },
                ];
                return Ng2ComponentInjectorService;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWNvbXBvbmVudC1pbmplY3Rvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmcyLWNvbXBvbmVudC1pbmplY3Rvci5zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFDVywyQkFBMkI7Ozs7Ozs7WUFBM0IseUNBQUEsMkJBQTJCLEdBQUcsQ0FBQztnQkFDdEMscUNBQXFDLHdCQUF3QixFQUFFLE9BQU87b0JBQ2xFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztvQkFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLFlBQVk7Z0JBQ2hCLENBQUM7Z0JBQ0QsMkJBQTJCLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLE1BQU07b0JBQzNELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDL0YsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNoRCxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUM7Z0JBQ0YsMkJBQTJCLENBQUMsU0FBUyxDQUFDLHVCQUF1QixHQUFHLFVBQVUsWUFBWTtvQkFDbEYsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUN2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
$__System.register("4", ["3", "2"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, ng2_component_injector_service_1;
    var Ng2ComponentInjectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_component_injector_service_1_1) {
                ng2_component_injector_service_1 = ng2_component_injector_service_1_1;
            }],
        execute: function() {
            exports_1("Ng2ComponentInjectorComponent", Ng2ComponentInjectorComponent = (function () {
                function Ng2ComponentInjectorComponent(componentInjectorService) {
                    this.componentInjectorService = componentInjectorService;
                    // not empty
                }
                Ng2ComponentInjectorComponent.prototype.ngOnChanges = function () {
                    var _this = this;
                    if (this.config) {
                        if (this.componentRef) {
                            this.componentRef.destroy();
                            this.componentRef = null;
                        }
                        this.config.container = this.contentContainerRef;
                        this.componentInjectorService.inject(this.config)
                            .then(function (componentRef) {
                            _this.componentRef = componentRef;
                        });
                    }
                };
                Ng2ComponentInjectorComponent.decorators = [
                    { type: core_1.Component, args: [{
                                moduleId: module.id,
                                selector: 'ng2-component-injector',
                                template: "<template #contentContainer></template>"
                            },] },
                ];
                /** @nocollapse */
                Ng2ComponentInjectorComponent.ctorParameters = [
                    { type: ng2_component_injector_service_1.Ng2ComponentInjectorService, },
                ];
                Ng2ComponentInjectorComponent.propDecorators = {
                    'config': [{ type: core_1.Input },],
                    'contentContainerRef': [{ type: core_1.ViewChild, args: ['contentContainer', { read: core_1.ViewContainerRef },] },],
                };
                return Ng2ComponentInjectorComponent;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWNvbXBvbmVudC1pbmplY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzItY29tcG9uZW50LWluamVjdG9yLmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBRVcsNkJBQTZCOzs7Ozs7Ozs7O1lBQTdCLDJDQUFBLDZCQUE2QixHQUFHLENBQUM7Z0JBQ3hDLHVDQUF1Qyx3QkFBd0I7b0JBQzNELElBQUksQ0FBQyx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztvQkFDekQsWUFBWTtnQkFDaEIsQ0FBQztnQkFDRCw2QkFBNkIsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHO29CQUNsRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDN0IsQ0FBQzt3QkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7d0JBQ2pELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDNUMsSUFBSSxDQUFDLFVBQVUsWUFBWTs0QkFDNUIsS0FBSyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7d0JBQ3RDLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO2dCQUNGLDZCQUE2QixDQUFDLFVBQVUsR0FBRztvQkFDdkMsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQ0FDZCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0NBQ25CLFFBQVEsRUFBRSx3QkFBd0I7Z0NBQ2xDLFFBQVEsRUFBRSx5Q0FBeUM7NkJBQ3RELEVBQUUsRUFBRTtpQkFDaEIsQ0FBQztnQkFDRixrQkFBa0I7Z0JBQ2xCLDZCQUE2QixDQUFDLGNBQWMsR0FBRztvQkFDM0MsRUFBRSxJQUFJLEVBQUUsNERBQTJCLEdBQUc7aUJBQ3pDLENBQUM7Z0JBQ0YsNkJBQTZCLENBQUMsY0FBYyxHQUFHO29CQUMzQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtvQkFDNUIscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFO2lCQUN6RyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQztZQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUM7Ozs7QUFDTCwwc0hBQTBzSCJ9
$__System.register("1", ["3", "2", "4"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, ng2_component_injector_service_1, ng2_component_injector_component_1;
    var Ng2ComponentInjectorModule;
    var exportedNames_1 = {
        'Ng2ComponentInjectorModule': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
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
            }],
        execute: function() {
            exports_1("Ng2ComponentInjectorModule", Ng2ComponentInjectorModule = (function () {
                function Ng2ComponentInjectorModule() {
                }
                Ng2ComponentInjectorModule.decorators = [
                    { type: core_1.NgModule, args: [{
                                declarations: [
                                    ng2_component_injector_component_1.Ng2ComponentInjectorComponent
                                ],
                                providers: [
                                    ng2_component_injector_service_1.Ng2ComponentInjectorService
                                ],
                                exports: [
                                    ng2_component_injector_component_1.Ng2ComponentInjectorComponent
                                ]
                            },] },
                ];
                /** @nocollapse */
                Ng2ComponentInjectorModule.ctorParameters = [];
                return Ng2ComponentInjectorModule;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWNvbXBvbmVudC1pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nMi1jb21wb25lbnQtaW5qZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUtXLDBCQUEwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUExQix3Q0FBQSwwQkFBMEIsR0FBRyxDQUFDO2dCQUNyQztnQkFDQSxDQUFDO2dCQUNELDBCQUEwQixDQUFDLFVBQVUsR0FBRztvQkFDcEMsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dDQUNiLFlBQVksRUFBRTtvQ0FDVixnRUFBNkI7aUNBQ2hDO2dDQUNELFNBQVMsRUFBRTtvQ0FDUCw0REFBMkI7aUNBQzlCO2dDQUNELE9BQU8sRUFBRTtvQ0FDTCxnRUFBNkI7aUNBQ2hDOzZCQUNKLEVBQUUsRUFBRTtpQkFDaEIsQ0FBQztnQkFDRixrQkFBa0I7Z0JBQ2xCLDBCQUEwQixDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQztZQUN0QyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUM7Ozs7QUFDTCxrOERBQWs4RCJ9
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});