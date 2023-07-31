import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('https://dummyjson.com/users');
  }

  setNewUsers(user: any) {
    return this.http.post('https://dummyjson.com/users/add',user)
  }

  editNewUsers(user: any) {
    return this.http.put(`https://dummyjson.com/users/${user.id}`,JSON.stringify(user))
  }
}
