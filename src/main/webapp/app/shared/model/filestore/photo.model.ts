export interface IPhoto {
  id?: string;
  contentContentType?: string;
  content?: any;
}

export class Photo implements IPhoto {
  constructor(public id?: string, public contentContentType?: string, public content?: any) {}
}
