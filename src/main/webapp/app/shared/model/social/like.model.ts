export interface ILike {
  id?: string;
  user?: string;
  postId?: string;
}

export class Like implements ILike {
  constructor(public id?: string, public user?: string, public postId?: string) {}
}
