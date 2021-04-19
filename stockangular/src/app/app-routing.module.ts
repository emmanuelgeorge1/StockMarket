import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockdetailsComponent } from './stockdetails/stockdetails.component';

const routes: Routes = [
  {
    path:'', redirectTo:'home',pathMatch:'full'
  },
  { path:'home',component:StockdetailsComponent
  },
  {
  path:'view-stock', loadChildren: () => import('../app/view-stock/view-stock.module').then(m => m.ViewStockModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
