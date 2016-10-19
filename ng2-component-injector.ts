import { NgModule } from '@angular/core';
import { Ng2ComponentInjectorService } from './src/ng2-component-injector.service';
import { Ng2ComponentInjectorComponent } from './src/ng2-component-injector.component';

export * from './src/ng2-component-injector.service';
export * from './src/ng2-component-injector.component';


@NgModule({
  declarations: [
    Ng2ComponentInjectorComponent
  ],
  providers: [
    Ng2ComponentInjectorService
  ],
  exports: [
    Ng2ComponentInjectorComponent
  ]
})
export class Ng2ComponentInjectorModule {
}