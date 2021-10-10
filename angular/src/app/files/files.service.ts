import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { File } from './file.type';

export interface FilesResponse {
  data: File[];
  pagination: {
    total: number;
  };
}

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private http: HttpClient) {}

  index(currentPage = 1, pageSize = 10): Observable<FilesResponse | any> {
    const queryParams = new HttpParams();

    queryParams.set('page', currentPage.toString());
    queryParams.set('per', pageSize.toString());

    return this.http
      .get<any>(`${environment.apiUrl}/files`, {
        params: new HttpParams().set('page', currentPage.toString()).set('per', pageSize.toString()),
      })
      .pipe(map(response => response));
  }
}
