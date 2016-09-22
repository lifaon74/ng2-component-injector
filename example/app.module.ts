import {NgModule} from '@angular/core';
import {ComponentInjectorService} from '../lib/component.injector.service';
import {AppComponent, MyComponent} from './app.component';

@NgModule({
  providers: [ComponentInjectorService],
  declarations: [AppComponent],
  entryComponents: [MyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
