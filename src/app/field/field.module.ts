import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FieldComponent],
  exports: [FieldComponent] // without this our appcomponent cannnot access fielcomponent and 
                            //hence will give an error on selector of field component
})
export class FieldModule { }
