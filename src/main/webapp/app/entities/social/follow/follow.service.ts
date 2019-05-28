import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFollow } from 'app/shared/model/social/follow.model';

type EntityResponseType = HttpResponse<IFollow>;
type EntityArrayResponseType = HttpResponse<IFollow[]>;

@Injectable({ providedIn: 'root' })
export class FollowService {
  public resourceUrl = SERVER_API_URL + 'services/social/api/follows';

  constructor(protected http: HttpClient) {}

  create(follow: IFollow): Observable<EntityResponseType> {
    return this.http.post<IFollow>(this.resourceUrl, follow, { observe: 'response' });
  }

  update(follow: IFollow): Observable<EntityResponseType> {
    return this.http.put<IFollow>(this.resourceUrl, follow, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IFollow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFollow[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
