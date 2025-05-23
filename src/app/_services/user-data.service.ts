import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiExternalUser } from '../_models/api-external-user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getAllUsers(page: number, results: number) {
    return this.http.get<ApiExternalUser>(
      `https://randomuser.me/api/?page=${page}&results=${results}`
    );
  }
}
