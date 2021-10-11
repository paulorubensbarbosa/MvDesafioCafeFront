import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'https://mvdesafioback.herokuapp.com/user';

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  add(user): Observable<User> {
    return this.http.post<User>(this.API, user);
  }

  setEdit(user: User): Observable<User> {
    return this.http.put<User>(`${this.API}`, user);
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API}/${id}`);
  }
}
