import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {

  constructor(private http:HttpClient) { }
  getStockCards(Symbol:string){

    return this.http.get("https://www.alphavantage.co/query?function=OVERVIEW&symbol="+Symbol+"&apikey=TKPTGR3QPLSZYN0Q");
    }
    getStockDetailsFromDB(){
      return this.http.get("http://localhost:5000/getStock");
    } 
}
