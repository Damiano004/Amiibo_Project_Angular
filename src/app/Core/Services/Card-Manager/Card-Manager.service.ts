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
    name: "AmiiboNotFound, please wait...",
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

  GetAmiiboFromID(head: string, tail: string):Card{
    this.#amiiboList().forEach((amiibo)  =>{
      let amiiboId;
      amiiboId = amiibo.head + amiibo.tail;
    })
    console.log("[received] Amiibo head: "+head+" Amiibo tail: "+tail);
    let amiibo: Card = this.#amiiboList().find(p => p.head === head && p.tail === tail) ?? this.#defaultCard;
    console.log("Amiibo name: "+amiibo.name+" Amiibo head: "+amiibo.head+" Amiibo tail: "+amiibo.tail);
    return amiibo;
  }

  CallGetHTTP():void{
    this.#http.get<Amiibo>(this.#URL+"?showusage")
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
