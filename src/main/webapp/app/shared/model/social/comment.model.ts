import { Moment } from 'moment';

export interface IComment {
  id?: string;
  user?: string;
  text?: string;
  createdOn?: Moment;
  postId?: string;
}

export class Comment implements IComment {
  constructor(public id?: string, public user?: string, public text?: string, public createdOn?: Moment, public postId?: string) {}
}
