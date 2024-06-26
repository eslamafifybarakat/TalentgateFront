import { SharedModule } from '../../app/shared/shared.module';
import { PagesModule } from '../pages/pages.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    SharedModule,
    PagesModule
  ],
  exports: []

})
export class LayoutModule { }
