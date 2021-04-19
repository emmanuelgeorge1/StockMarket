import { Component } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { StockDetailsService } from '../service/stock-details.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lstCard: Array<any> = new Array<any>();;
  lstStockDetails: Array<any> = new Array<any>();
  tableFlag: boolean = false;
  constructor(private dataservice: DataserviceService, private stockDetails: StockDetailsService) { }

  ngOnInit() {
    debugger;
    let tempLstCard = this.dataservice.getData();
    if (tempLstCard != null &&
      tempLstCard != undefined) {
      this.lstCard = this.dataservice.getData();
    }
    else {
      //GOOGLE Stock Price Fetch
      let symbol = "GOOGL";
      this.stockDetails.getStockCards(symbol)
        .subscribe((data: any) => {
          symbol = "GOOGL";
          if (data) {
            let stockCardDetailsObj = new stockCardDetails(
              parseInt(data["AnalystTargetPrice"]),
              symbol,
              data["Currency"], 'bi bi-google'
            )
            this.lstCard.push(stockCardDetailsObj);
            this.dataservice.saveData(this.lstCard);
          }

        }, (data) => {
          alert(data.error.message);
        })
      //FB Stock Price Fetch
      symbol = "FB";
      this.stockDetails.getStockCards(symbol)
        .subscribe((data: any) => {
          symbol = "FB";
          if (data) {
            ///  alert(data.message);
            let stockCardDetailsObj = new stockCardDetails(
              parseInt(data["AnalystTargetPrice"]),
              symbol,
              data["Currency"], 'bi bi-facebook'
            )
            this.lstCard.push(stockCardDetailsObj);
            this.dataservice.saveData(this.lstCard);
          }

        }, (data) => {
          alert(data.error.message);
        })
      //AMZNdata
      symbol = "AMZN";
      this.stockDetails.getStockCards(symbol)
        .subscribe((data: any) => {
          if (data) {
            symbol = "AMZN";
            ///  alert(data.message);
            let stockCardDetailsObj = new stockCardDetails(
              parseInt(data["AnalystTargetPrice"]),
              symbol,
              data["Currency"], 'fa fa-amazon'
            )
            this.lstCard.push(stockCardDetailsObj);
            this.dataservice.saveData(this.lstCard);
          }
          console.log(this.lstCard);

        }, (data) => {
          alert(data.error.message);
        })
    }

    this.stockDetails.getStockDetailsFromDB()
      .subscribe((dataFromDB: any) => {
        let savedFlag: boolean = false;
        savedFlag = false

        dataFromDB.savedStock.forEach(function (savedValue: any) {
          let stockInfoObj = new StockDetails(
            savedValue['companyName'],
            savedValue['companyName'].substr(0, 5),
            savedValue['marketCap'],
            savedValue['currentPrice'],
            savedFlag
          );
          this.lstStockDetails.push(stockInfoObj);
          console.log(this.lstStockDetails);
        }.bind(this));
      }, (data) => {
        alert(data.error.message);
      })
  }
}
export class stockCardDetails {
  constructor(
    public stockPrice: number,
    public stockSymbol: string,
    public stockCurrency: string,
    public stockIcon: string) {
  }
}
export class StockDetails {
  constructor(
    public companyName: string,
    public symbols: string,
    public marketCap: string,
    public currentPrice: string,
    public savedFlag: boolean) {
  }
}
