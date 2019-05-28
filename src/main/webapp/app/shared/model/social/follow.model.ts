export interface IFollow {
  id?: string;
  user?: string;
  following?: string;
}

export class Follow implements IFollow {
  constructor(public id?: string, public user?: string, public following?: string) {}
}
