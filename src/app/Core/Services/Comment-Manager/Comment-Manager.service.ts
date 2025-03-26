import { Injectable, signal } from '@angular/core';
import { Comment } from '../../Models/Comment'
import { Comments } from '../../Models/Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {
  c1: Comment = {
    title: 't1',
    user: 'u1',
    body: 'b1'
  };
  c2: Comment = {
    title: 't2',
    user: 'u2',
    body: 'b2'
  };
  c3: Comment = {
    title: 't3',
    user: 'u3',
    body: 'b3'
  };

  comments = signal<Comments[]>([
    {id: 'a', comment: this.c1},
    {id: 'a', comment: this.c2},
    {id: 'b', comment: this.c3}
  ]);

  GetComments(id:string){
    if(id == null){
      console.log('Error: the insered id is null');
      return;
    }
    let comment: Comments[] = this.comments().filter(c => c.id === id) ?? this.c1;
    console.log('Comment: '+comment);
    return comment;
  }

  AddComment(id: string, comment: Comment){
    if(id == null){
      console.log('Error: the insered id is null');
      return;
    }
    if(comment == null){
      console.log('Error: received comment was null');
      return;
    }
    let newComment: Comments = {
      'id': id,
      'comment': comment
    }
    this.comments.update(currentItems => [...currentItems,newComment])
  }
}
