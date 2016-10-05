import { NgModule } from '@angular/core';
import { ComponentInjectorService } from '../ng2-component-injector';
import { AppComponent, MyComponent } from './app.component';

@NgModule({
  providers: [ComponentInjectorService],
  declarations: [AppComponent],
  entryComponents: [MyComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
