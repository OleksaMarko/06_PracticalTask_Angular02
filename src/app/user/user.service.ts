import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  private API = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  list(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.API}/users`);
  }

  create(body: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(`${this.API}/users`, body);
  }

  delete(id: IUser['id']): Observable<never> {
    return this.http.delete<never>(`${this.API}/users/${id}`);
  }
}
