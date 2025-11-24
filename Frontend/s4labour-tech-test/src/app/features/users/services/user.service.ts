import { Injectable, effect, inject, signal } from '@angular/core';
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

  constructor() {
    let previous: Record<string, boolean> = {};

    effect(() => {
      const currentUsers = this.users();

      // Read all isFavourited flags so Angular tracks them individually
      const current = Object.fromEntries(
        currentUsers.map(u => [u.login.uuid, u.isFavourite])
      );

      // Find which users changed
      const changedUsers = currentUsers.filter(
        u => previous[u.login.uuid] !== undefined && previous[u.login.uuid] !== current[u.login.uuid]
      );

      if (changedUsers.length > 0) {
        changedUsers.forEach(u => {
          this.updateLocalStorage(u.login.uuid, u.isFavourite);
        });
      }

      // Update snapshot for next run
      previous = current;
    });
  }

  async loadUsers(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      // Add 1 second delay for testing loading spinner
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = await firstValueFrom(
        this.http.get<UserApiResponse>(`${environment.urls.coreApi}/Users`)
      );

      const favouriteIds = this.getFavouriteIds();
      const usersWithFavouriteSet = result.results.map(user => ({
        ...user,
        isFavourite: favouriteIds.includes(user.login.uuid)
      }));

      this.users.set(usersWithFavouriteSet);
    } catch (err) {
      this.error.set('Failed to load users.');
    } finally {
      this.loading.set(false);
    }
  }

  setFavourite(userId: string, isFavourite: boolean): void {
    this.users.update(users => {
      const user = users.find(u => u.login.uuid === userId);
      if (user) {
        user.isFavourite = isFavourite;
      }
      return [...users];
    });
  }

  private getFavouriteIds(): string[] {
    const stored = localStorage.getItem('favourite_users');
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavouriteIds(ids: string[]): void {
    localStorage.setItem('favourite_users', JSON.stringify(ids));
  }

  private updateLocalStorage(userId: string, isFavourite: boolean): void {
    const favourites = this.getFavouriteIds();

    if (isFavourite) {
      if (!favourites.includes(userId)) {
        favourites.push(userId);
        this.saveFavouriteIds(favourites);
      }
    } else {
      const filtered = favourites.filter(id => id !== userId);
      this.saveFavouriteIds(filtered);
    }
  }
}