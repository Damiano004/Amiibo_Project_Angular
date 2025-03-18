import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Models/Card.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Models/Amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {

  readonly #defaultCard: Card = {
    head: "-1",
    tail: "-1",
    name: "AmiiboNotFound",
    image: "",
    gameSeries: "",
    games3DS: [],
    gamesSwitch: [],
    gamesWiiU: []
  }

  #defaultAmiiboList: Amiibo = {amiibo: [this.#defaultCard]}

  #URL = "https://www.amiiboapi.com/api/amiibo/";
  #amiiboList = signal<Card[]>([]);
  readonly #http = inject(HttpClient);

  amiiboListComp = computed(() => this.#amiiboList());


constructor() { }

  GetAmiiboFromID(id: string):void{
    this.#amiiboList().forEach((amiibo)  =>{
      let amiiboId;
      amiiboId = amiibo.head + amiibo.tail;
    })
    let head = id.slice(0,8);
    let tail = id.slice(8)
    console.log("Find name: "+this.#amiiboList().find(p => p.head === head && p.tail === tail)?.name +" From head: "+head+" + tail: "+ tail);

  }

  CallGetHTTP():void{
    this.#http.get<Amiibo>(this.#URL+"/?showusage")
    .pipe(
      retry(3),
      catchError((err)=>{
        console.log(err);
        return of<Amiibo>(this.#defaultAmiiboList);
      })
    )
    .subscribe((amiiboList: Amiibo) => {
      console.log(amiiboList);
      this.#amiiboList.update(() => [...this.#amiiboList(),...amiiboList.amiibo]);
    });
  }
}
