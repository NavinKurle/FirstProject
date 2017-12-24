import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FieldModule } from './field/field.module';
import { FieldComponent } from './field/field/field.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
