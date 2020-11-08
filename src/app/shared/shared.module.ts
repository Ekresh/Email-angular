import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [InputComponent, SnackBarComponent, LoaderComponent, NavComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputComponent, SnackBarComponent, LoaderComponent, NavComponent]
})
export class SharedModule { }
