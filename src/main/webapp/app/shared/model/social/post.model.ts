import { Moment } from 'moment';
import { ILike } from 'app/shared/model/social/like.model';
import { IComment } from 'app/shared/model/social/comment.model';

export interface IPost {
  id?: string;
  user?: string;
  description?: string;
  photo?: string;
  createdOn?: Moment;
  likes?: ILike[];
  comments?: IComment[];
}

export class Post implements IPost {
  constructor(
    public id?: string,
    public user?: string,
    public description?: string,
    public photo?: string,
    public createdOn?: Moment,
    public likes?: ILike[],
    public comments?: IComment[]
  ) {}
}
