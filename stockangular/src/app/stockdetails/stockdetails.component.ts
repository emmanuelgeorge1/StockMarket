import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { DataService } from '../services/data.service';
import { StockServiceService } from '../services/stock-service.service';

@Component({
  selector: 'app-stockdetails',
  templateUrl: './stockdetails.component.html',
  styleUrls: ['./stockdetails.component.css']
})
export class StockdetailsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private stockservice: StockServiceService, private dataservice: DataService,
    private toastr:ToastrService,private router:Router) { }
  lstCard: Array<any> = new Array<any>();
  lstStockDetails: Array<any> = new Array<any>();
  
  ngOnInit():  void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    let tempLstCard = this.dataservice.getData();
    if (tempLstCard != null &&
      tempLstCard != undefined) {
      this.lstCard = this.dataservice.getData();
    }
    else {
      //GOOGLE Stock Price Fetch
      let symbol = "GOOGL";
      this.stockservice.getStockCards(symbol)
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
          this.toastr.error(data.error.message, 'Error!!');
        })
      //FB Stock Price Fetch
      symbol = "FB";
      this.stockservice.getStockCards(symbol)
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
          this.toastr.error(data.error.message, 'Error!!');
        })
      //AMZNdata
      symbol = "AMZN";
      this.stockservice.getStockCards(symbol)
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

        }, (data) => {
          this.toastr.error(data.error.message, 'Error!!');
        })

    }

    this.stockservice.getStockDetails()
      .subscribe((data: any) => {
        this.stockservice.getStockDetailsFromDB()
          .subscribe((dataFromDB: any) => {
            let contThis = this;
            let savedFlag: boolean = false;
            data.forEach(function (value: any) {
              savedFlag = false
              dataFromDB.savedStock.forEach(function (savedValue: any) {
                if (savedValue["symbols"] == value['companyName'].substr(0, 5)) {
                  savedFlag = true;
                }
              });
              let stockInfoObj = new StockDetails(
                value['companyName'],
                value['companyName'].substr(0, 5),
                value['MarketCapital'],
                value['CurrencyPrice'],
                savedFlag
              );
              contThis.lstStockDetails.push(stockInfoObj);
            }.bind(this));
            console.log(this.lstStockDetails);
            this.dtTrigger.next();
          });
      }, (data) => {
        this.toastr.error(data.error.message, 'Error!!');       
      })
  }

  view(obj:any) {
   this.dataservice.setViewData(obj);
   this.router.navigateByUrl('view-stock');
  }
  saveData(obj: any) {
    this.stockservice.saveStockDeails(obj)
      .subscribe((data) => {
        let savedFlag: boolean = false;
        if (data) {
          this.lstStockDetails.forEach(function(stock) {
            if(obj.symbol==stock.symbol)
          obj.savedFlag=true;
          })
          this.toastr.success('Stock Succesfully Saved', 'Success!!');
        }

      }, (data) => {
        this.toastr.error(data.error.message, 'Error!!');
      });
  }
  delete(obj:any){
    this.stockservice.removeStockDetailsFromBB(obj.symbol)
    .subscribe((data) => {
      let savedFlag: boolean = true;
      this.lstStockDetails.forEach(function(stock) {
        if(obj.symbol==stock.symbol)
      obj.savedFlag=false;
      })
     this.toastr.success('Stock Succesfully Saved', 'Deleted!!');
    
  },(data) => {
    this.toastr.error(data.error.message, 'Error!!');
  });
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
    public companyName?: string,
    public symbols?: string,
    public marketCap?: string,
    public currentPrice?: string,
    public savedFlag?: boolean) {
  }
}


