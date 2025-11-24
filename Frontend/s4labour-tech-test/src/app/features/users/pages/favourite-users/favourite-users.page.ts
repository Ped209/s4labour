import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsersList } from '@users/components';
import { IconMessage } from "@app/shared/components";
import { UsersStore } from '@users/stores';

@Component({
  selector: 'app-favourite-users',
  imports: [MatCardModule, MatIconModule, UsersList, IconMessage],
  templateUrl: './favourite-users.page.html',
  styleUrl: './favourite-users.page.scss',
})
export class FavouriteUsersPage {
  usersStore = inject(UsersStore);
}
