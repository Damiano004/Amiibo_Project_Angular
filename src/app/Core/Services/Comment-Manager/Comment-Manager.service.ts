import { Injectable, signal } from '@angular/core';
import { Comments } from '../../Models/Comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {

  // Oggetto di default per i commenti
  defaultComments: Comments = {id: '-1', comments: []};

  // Signal con tutti i commenti
  comments = signal<Comments[]>([]);

  // Restituisce i commenti associati a uno specifico id, oppure quelli di default se non trovati
  GetComments(id:string| undefined): Comments{
    if(id === null){
      console.log('Error: the insered id is null');
      return this.defaultComments;
    }
    let amiiboComment = this.comments().find(c => c.id === id) ?? this.defaultComments;
    return amiiboComment;
  }

  // Aggiunge un commento a uno specifico id
  AddComment(id: string, comment: any){
    if (!id) {
      console.error('Error: the inserted id is null or undefined');
      return;
    }
    if (!comment) {
      console.error('Error: received comment was null or undefined');
      return;
    }

    // Aggiorna la lista dei commenti
    this.comments.update(currentComments => {
      const index = currentComments.findIndex(c => c.id === id);
      if (index !== -1) {
        // Se esiste già, aggiunge il commento alla lista
        const updatedComment = {
          ...currentComments[index],
          comments: [...currentComments[index].comments, comment]
        };
        return [
          ...currentComments.slice(0, index),
          updatedComment,
          ...currentComments.slice(index + 1)
        ];
      }
      // Se non esiste, crea un nuovo oggetto Comments per quell'id
      return [...currentComments, { id, comments: [comment] }];
    });

    // Aggiorna il localStorage con i commenti aggiornati per quell'id
    const updated = this.comments().find(c => c.id === id);
    if (updated) {
      localStorage.setItem(id, JSON.stringify(updated));
    }
  }
}
