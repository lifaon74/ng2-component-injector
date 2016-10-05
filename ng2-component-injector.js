import { ComponentFactoryResolver, KeyValueDiffers, Injectable, SimpleChange } from '@angular/core';
export var ComponentInjectorService = (function () {
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
                    changes[change.key] = new SimpleChange(change.previousValue, change.currentValue);
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
        var _loop_1 = function(prop) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentInjectorService.ctorParameters = [
        { type: ComponentFactoryResolver, },
        { type: KeyValueDiffers, },
    ];
    return ComponentInjectorService;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWNvbXBvbmVudC1pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nMi1jb21wb25lbnQtaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFDTCx3QkFBd0IsRUFBRSxlQUFlLEVBQW9CLFVBQVUsRUFDdkUsWUFBWSxFQUNiLE1BQU0sZUFBZTtBQVl0QjtJQUVFLGtDQUNVLHdCQUFpRCxFQUNqRCxPQUF1QjtRQUR2Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQXlCO1FBQ2pELFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRS9CLFlBQVk7SUFDZCxDQUFDO0lBRUQseUNBQU0sR0FBTixVQUFPLE1BQStCO1FBRXBDLElBQUksZ0JBQWdCLEdBQXlCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckgsSUFBSSxZQUFZLEdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVoRCxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUdPLDBEQUF1QixHQUEvQixVQUFnQyxZQUFnQjtRQUM5QyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFdkcsWUFBWSxDQUFDLFVBQVUsR0FBRztZQUN4QixJQUFJLE9BQU8sR0FBTyxJQUFJLENBQUM7WUFDdkIsSUFBSSxJQUFJLEdBQUcs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OztTQXFCNUI7SUFDSCxDQUFDO0lBRUksbUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCx1Q0FBYyxHQUE2RDtRQUNsRixFQUFDLElBQUksRUFBRSx3QkFBd0IsR0FBRztRQUNsQyxFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7S0FDeEIsQ0FBQztJQUNGLCtCQUFDO0FBQUQsQ0FBQyxBQW5GRCxJQW1GQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBLZXlWYWx1ZURpZmZlcnMsIFZpZXdDb250YWluZXJSZWYsIEluamVjdGFibGUsXHJcbiAgU2ltcGxlQ2hhbmdlLCBLZXlWYWx1ZUNoYW5nZVJlY29yZCwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9uZW50SW5qZWN0b3JDb25maWcge1xyXG4gIGNvbnRhaW5lcjpWaWV3Q29udGFpbmVyUmVmO1xyXG4gIGNvbXBvbmVudDphbnk7XHJcbiAgaW5wdXRzPzphbnk7XHJcbiAgb3V0cHV0cz86YW55O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRJbmplY3RvclNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgZGlmZmVyczpLZXlWYWx1ZURpZmZlcnNcclxuICApIHtcclxuICAgIC8vIG5vdCBlbXB0eVxyXG4gIH1cclxuXHJcbiAgaW5qZWN0KGNvbmZpZzpJQ29tcG9uZW50SW5qZWN0b3JDb25maWcpOlByb21pc2U8Q29tcG9uZW50UmVmPGFueT4+IHtcclxuXHJcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeTpDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb25maWcuY29tcG9uZW50KTtcclxuICAgIGxldCBjb21wb25lbnRSZWY6YW55ID0gY29uZmlnLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgdGhpcy5fZXh0ZW5kV2l0aERldGVjdENoYW5nZShjb21wb25lbnRSZWYpO1xyXG4gICAgdGhpcy5faW5qZWN0UHJvcGVydHlCaW5kcyhjb25maWcsIGNvbXBvbmVudFJlZik7XHJcblxyXG4gICAgY29tcG9uZW50UmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbXBvbmVudFJlZik7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBfZXh0ZW5kV2l0aERldGVjdENoYW5nZShjb21wb25lbnRSZWY6YW55KSB7XHJcbiAgICBjb21wb25lbnRSZWYuX2RpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKGNvbXBvbmVudFJlZi5pbnN0YW5jZSkuY3JlYXRlKGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZik7XHJcblxyXG4gICAgY29tcG9uZW50UmVmLmdldENoYW5nZXMgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBjaGFuZ2VzOmFueSA9IG51bGw7XHJcbiAgICAgIGxldCBkaWZmID0gY29tcG9uZW50UmVmLl9kaWZmZXIuZGlmZihjb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgICBpZihkaWZmKSB7XHJcbiAgICAgICAgZGlmZi5mb3JFYWNoSXRlbSgoY2hhbmdlOktleVZhbHVlQ2hhbmdlUmVjb3JkKSA9PiB7XHJcbiAgICAgICAgICBpZihjaGFuZ2VzID09PSBudWxsKSB7IGNoYW5nZXMgPSB7fTsgfVxyXG4gICAgICAgICAgY2hhbmdlc1tjaGFuZ2Uua2V5XSA9IG5ldyBTaW1wbGVDaGFuZ2UoY2hhbmdlLnByZXZpb3VzVmFsdWUsIGNoYW5nZS5jdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFuZ2VzO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRSZWYuZGV0ZWN0Q2hhbmdlcyA9ICgpID0+IHtcclxuICAgICAgaWYodHlwZW9mIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5uZ09uQ2hhbmdlcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGxldCBjaGFuZ2VzOmFueSA9IGNvbXBvbmVudFJlZi5nZXRDaGFuZ2VzKCk7XHJcbiAgICAgICAgaWYoY2hhbmdlcykge1xyXG4gICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luamVjdFByb3BlcnR5QmluZHMoY29uZmlnOklDb21wb25lbnRJbmplY3RvckNvbmZpZywgY29tcG9uZW50UmVmOmFueSkge1xyXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDQ2NTIxNC9hY2Nlc3MtbWV0YS1hbm5vdGF0aW9uLWluc2lkZS1jbGFzcy10eXBlc2NyaXB0XHJcbiAgICBsZXQgcHJvcE1ldGFkYXRhOmFueSA9ICg8YW55PlJlZmxlY3QpLmdldE93bk1ldGFkYXRhKCdwcm9wTWV0YWRhdGEnLCBjb25maWcuY29tcG9uZW50KTtcclxuICAgIGZvcihsZXQgcHJvcCBpbiBwcm9wTWV0YWRhdGEpIHtcclxuICAgICAgaWYocHJvcE1ldGFkYXRhW3Byb3BdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBwcm9wTWV0YWRhdGFbcHJvcF0uZm9yRWFjaCgobWV0YWRhdGE6YW55KSA9PiB7XHJcbiAgICAgICAgICBzd2l0Y2gobWV0YWRhdGEudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICBjYXNlICdASW5wdXQnOlxyXG4gICAgICAgICAgICAgIGlmKGNvbmZpZy5pbnB1dHMgJiYgY29uZmlnLmlucHV0c1twcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlW3Byb3BdID0gY29uZmlnLmlucHV0c1twcm9wXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXNzaW5nIGlucHV0IFsnICsgcHJvcCArICddIGZvciAnICsgY29uZmlnLmNvbXBvbmVudC5uYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0BPdXRwdXQnOlxyXG4gICAgICAgICAgICAgIGlmKGNvbmZpZy5vdXRwdXRzICYmICh0eXBlb2YgY29uZmlnLm91dHB1dHNbcHJvcF0gPT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbcHJvcF0uc3Vic2NyaWJlKGNvbmZpZy5vdXRwdXRzW3Byb3BdKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXNzaW5nIG91dHB1dCAoJyArIHByb3AgKyAnKSBmb3IgJyArIGNvbmZpZy5jb21wb25lbnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbnt0eXBlOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIH0sXG57dHlwZTogS2V5VmFsdWVEaWZmZXJzLCB9LFxuXTtcbn1cclxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=