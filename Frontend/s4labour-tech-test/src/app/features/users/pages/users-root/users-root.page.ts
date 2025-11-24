import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '@users/services';
import { IconMessage, LoadingSpinner } from "@app/shared/components";

@Component({
  selector: 'app-users-root',
  imports: [RouterOutlet, IconMessage, LoadingSpinner],
  templateUrl: './users-root.page.html',
  styleUrl: './users-root.page.scss',
})
export class UsersRootPage {

  usersService = inject(UsersService);

  constructor() {
    this.usersService.loadUsers();
  }
}
