import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { StockDetails } from 'src/app/stockdetails/stockdetails.component';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit {

  constructor(private dataservice: DataService, private router:Router) { }
  stockDetails:StockDetails=new StockDetails();
  ngOnInit(): void {
    this.stockDetails=this.dataservice.getViewData();
    console.log(this.stockDetails);
  }
  home(){
    this.router.navigateByUrl('home');
  }

}
