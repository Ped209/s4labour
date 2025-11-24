import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersList } from '@users/components';
import { IconMessage } from "@app/shared/components";
import { UsersStore } from '@users/stores';

@Component({
  selector: 'app-users',
  imports: [MatCardModule, UsersList, IconMessage],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
})
export class UsersPage {
  usersStore = inject(UsersStore);
}
