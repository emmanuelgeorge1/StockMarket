import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  withCredentials:true
}

@Injectable({
  providedIn: 'root'
})

export class DataService { 
  constructor(private http:HttpClient) { 
  }
      saveData(lstCard: any){
        localStorage.setItem("lstCard",JSON.stringify(lstCard));
      }
    
    
      getData():any{
        let value=JSON.parse(localStorage.getItem('lstCard') || '{}')
        return Object.keys(value).length===0?null:value;
      }
      setViewData(obj: any){
        localStorage.setItem("obj",JSON.stringify(obj));
      }
    
    
      getViewData():any{
        let value=JSON.parse(localStorage.getItem('obj') || '{}')
        return Object.keys(value).length===0?null:value;
      } 
  }

