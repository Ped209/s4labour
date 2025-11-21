import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsersList } from '@users/components';
import { UsersService } from '@users/services';

@Component({
  selector: 'app-favourite-users',
  imports: [MatCardModule, MatIconModule, UsersList, RouterLink],
  templateUrl: './favourite-users.page.html',
  styleUrl: './favourite-users.page.scss',
})
export class FavouriteUsersPage {
  usersService = inject(UsersService);
  
  favouriteUsers = computed(() => 
    this.usersService.users().filter(u => u.isFavourite)
  );
}
