import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewStockRoutingModule } from './view-stock-routing.module';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewStockComponent],
  imports: [
    CommonModule,
    ViewStockRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class ViewStockModule {
  constructor(){
    console.log("ViewStockModule");
  }
 }
