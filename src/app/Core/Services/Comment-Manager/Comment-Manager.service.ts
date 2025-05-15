import { Injectable, signal } from '@angular/core';
import { Comments } from '../../Models/Comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {

  defaultComments: Comments = {id: '-1', comments: []};

  comments = signal<Comments[]>([]);

  GetComments(id:string| undefined): Comments{
    if(id === null){
      console.log('Error: the insered id is null');
      return this.defaultComments;
    }
    let amiiboComment = this.comments().find(c => c.id === id) ?? this.defaultComments;
    return amiiboComment;
  }

  AddComment(id: string, comment: any){
    console.log("Received comment: "+comment.user);
    if(id == null){
      console.log('Error: the insered id is null');
      return;
    }
    if(comment == null){
      console.log('Error: received comment was null');
      return;
    }
    this.comments.update(currentComments => {
      const index = currentComments.findIndex(comment => comment.id === id);
      if(index !== -1){
        console.log("adding comment");
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
      const newComment = {
        id,
        comments: [comment]
      };
      return [...currentComments, newComment];
    });
    console.log("added comment: "+id+"\nComment length: "+this.comments().length);
    localStorage.setItem(id,JSON.stringify(this.comments().filter(c => c.id === id) ?? this.defaultComments.comments[0]));
  }
}
