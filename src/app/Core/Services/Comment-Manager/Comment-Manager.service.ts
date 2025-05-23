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
    if (!id) {
      console.error('Error: the inserted id is null or undefined');
      return;
    }
    if (!comment) {
      console.error('Error: received comment was null or undefined');
      return;
    }

    this.comments.update(currentComments => {
      const index = currentComments.findIndex(c => c.id === id);
      if (index !== -1) {
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
      return [...currentComments, { id, comments: [comment] }];
    });

    const updated = this.comments().find(c => c.id === id);
    if (updated) {
      localStorage.setItem(id, JSON.stringify(updated));
    }
  }
}
