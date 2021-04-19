import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewStockComponent } from './view-stock/view-stock.component';

const routes: Routes = [
  {
    path:'',component:ViewStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewStockRoutingModule {
  constructor(){
    console.log("ViewStockRoutingModule");
  }
 }
