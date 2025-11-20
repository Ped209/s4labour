import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { User, UserApiResponse } from '../types';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  // STATE SIGNALS
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  async loadUsers(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const result = await firstValueFrom(
        this.http.get<UserApiResponse>(`${environment.urls.coreApi}/Users`)
      );
      this.users.set(result.results);
    } catch (err) {
      this.error.set('Failed to load users.');
    } finally {
      this.loading.set(false);
    }
  }
}