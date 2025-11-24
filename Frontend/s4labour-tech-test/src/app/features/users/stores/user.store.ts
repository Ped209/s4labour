import { computed, effect, inject, Injectable, signal, untracked } from "@angular/core";
import { USER_FAVOURITES_STORAGE_KEY } from "@app/shared/data/constants";
import { UsersService } from "@users/services";
import { User } from "@users/types";
import { finalize } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private usersService = inject(UsersService);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  favouriteUsers = computed(() => 
    this.users().filter(u => u.isFavourite())
  );

  constructor() {
    this.loadUsers();
    this.setupFavouritesEffect();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    const favouriteIds = this.getFavouriteIds();

    this.usersService
      .getUsers()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          // Wrap isFavourite as signal
          const usersWithSignal = response.results.map(u => ({
            ...u,
            isFavourite: signal(favouriteIds.includes(u.login.uuid))
          }));
          this.users.set(usersWithSignal);
        },
        error: () => this.error.set('Failed to load users'),
      });
  }

  setFavourite(userId: string, value: boolean) {
    const user = this.users().find(u => u.login.uuid === userId);
    if (user) user.isFavourite.set(value);
  }

  private setupFavouritesEffect() {
    effect(() => {
      this.users().forEach(u => {
        const fav = u.isFavourite();
        untracked(() => this.updateLocalStorage(u.login.uuid, fav));
      });
    });
  }

  private getFavouriteIds(): string[] {
    try {
      return JSON.parse(localStorage.getItem(USER_FAVOURITES_STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  private saveFavouriteIds(ids: string[]) {
    localStorage.setItem(USER_FAVOURITES_STORAGE_KEY, JSON.stringify(ids));
  }

  private updateLocalStorage(userId: string, isFavourite: boolean) {
    const favourites = this.getFavouriteIds();
    let updated: string[];
    if (isFavourite) {
      updated = favourites.includes(userId) ? favourites : [...favourites, userId];
    } else {
      updated = favourites.filter(id => id !== userId);
    }
    this.saveFavouriteIds(updated);
  }
}
