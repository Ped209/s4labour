import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersList } from '@users/components';
import { UsersService } from '@users/services';
import { IconMessage } from "@app/shared/components";

@Component({
  selector: 'app-users',
  imports: [MatCardModule, UsersList, IconMessage],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
})
export class UsersPage {
  usersService = inject(UsersService);
}
