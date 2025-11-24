import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { UserApiResponse } from '../types';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  getUsers(): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(`${environment.urls.coreApi}/Users`);
  }
}