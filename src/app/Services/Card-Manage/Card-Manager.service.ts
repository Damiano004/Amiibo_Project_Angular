import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Core/Model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Core/AmiiboOBJ';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {

  #URL = "https://www.amiiboapi.com/api/amiibo/";
  #amiiboList = signal<Card[]>([]);
  #http = inject(HttpClient);
  amiiboListComp = computed(() => this.#amiiboList());

  defaultAmiiboList = [{
    head: -1,
    name: "No amiibo found",
    gameSeries: "error",
    image: ""
  }];

constructor() { }

  HexToDec(hex: string): number{
    if(hex == null){
      return -1;
    }
    console.log("returning "+parseInt(hex, 16))
    return parseInt(hex, 16);
  }

  CallGetHTTP():void{
    this.#http.get<Amiibo>(this.#URL)
    .pipe(
      retry(3),
      catchError((err)=>{
        console.log(err);
        return of<Amiibo>();
      })
    )
    .subscribe((amiiboList: Amiibo) => {
      console.log(amiiboList);
      this.#amiiboList.update(() => [...this.#amiiboList(),...amiiboList.amiibo]);
    });
  }
}
