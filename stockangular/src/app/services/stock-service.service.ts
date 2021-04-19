import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http:HttpClient) { 
    
  }

  getStockCards(Symbol:string){

    return this.http.get("https://www.alphavantage.co/query?function=OVERVIEW&symbol="+Symbol+"&apikey=TKPTGR3QPLSZYN0Q");
    } 
  getStockDetails(){
    return this.http.get("https://607a8382bd56a60017ba2b9e.mockapi.io/api/StockDetails/V1/Stock")
  }
  saveStockDeails(data:any){
    return this.http.post("http://localhost:5000/saveStock",data);
  }
  getStockDetailsFromDB(){
    return this.http.get("http://localhost:5000/getStock");
  }
  removeStockDetailsFromBB(symbol:any){
     return this.http.delete("http://localhost:5000/deleteStock",symbol);   
  }
}