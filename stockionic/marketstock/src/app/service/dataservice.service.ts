import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }
      saveData(lstCard: any){
        localStorage.setItem("lstCard",JSON.stringify(lstCard));
      }
    
    
      getData():any{
        let value=JSON.parse(localStorage.getItem('lstCard') || '{}')
        return Object.keys(value).length===0?null:value;
      }
}

