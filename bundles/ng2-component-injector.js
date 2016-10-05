!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], ["2"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("1", ["2"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var ComponentInjectorService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("ComponentInjectorService", ComponentInjectorService = (function () {
                function ComponentInjectorService(componentFactoryResolver, differs) {
                    this.componentFactoryResolver = componentFactoryResolver;
                    this.differs = differs;
                    // not empty
                }
                ComponentInjectorService.prototype.inject = function (config) {
                    var componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
                    var componentRef = config.container.createComponent(componentFactory);
                    this._extendWithDetectChange(componentRef);
                    this._injectPropertyBinds(config, componentRef);
                    componentRef.detectChanges();
                    return Promise.resolve(componentRef);
                };
                ComponentInjectorService.prototype._extendWithDetectChange = function (componentRef) {
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
                ComponentInjectorService.prototype._injectPropertyBinds = function (config, componentRef) {
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
                ComponentInjectorService.decorators = [
                    { type: core_1.Injectable },
                ];
                /** @nocollapse */
                ComponentInjectorService.ctorParameters = [
                    { type: core_1.ComponentFactoryResolver, },
                    { type: core_1.KeyValueDiffers, },
                ];
                return ComponentInjectorService;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWNvbXBvbmVudC1pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nMi1jb21wb25lbnQtaW5qZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUNXLHdCQUF3Qjs7Ozs7OztZQUF4QixzQ0FBQSx3QkFBd0IsR0FBRyxDQUFDO2dCQUNuQyxrQ0FBa0Msd0JBQXdCLEVBQUUsT0FBTztvQkFDL0QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO29CQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsWUFBWTtnQkFDaEIsQ0FBQztnQkFDRCx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVUsTUFBTTtvQkFDeEQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvRixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN0RSxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ2hELFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQztnQkFDRix3QkFBd0IsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxZQUFZO29CQUMvRSxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3ZHLFlBQVksQ0FBQyxVQUFV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
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});