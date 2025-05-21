import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Models/Card.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Models/Amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {
  maxCards: number = 51;
  //readonly showingAmiibos = signal<Amiibo>;

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

  getSplicedCards():Card[]{
    if(this.amiiboListComp().length == 0){
      console.log("abiiboListComp is empty");
      return [];
    }
    console.log("sto facendo robe :D "+this.maxCards)
    if(this.maxCards>=this.amiiboListComp().length){
      this.maxCards = this.amiiboListComp().length -1;
    }
    return this.amiiboListComp().slice(0,this.maxCards);
  }

  showMoreCards(): void{
    this.maxCards+=51;
  }

  reachedMaxCards():boolean{
    console.log("reached max cards: ", this.maxCards >= this.amiiboListComp().length -1);
    return this.maxCards >= this.amiiboListComp().length -1;
  }

  isEmpty():boolean{
    console.log("is empty: ", this.amiiboListComp().length === 0);
    return this.amiiboListComp().length === 0;
  }

  CallGetHTTP():void{
    console.log("Calling Get HTTP");
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
