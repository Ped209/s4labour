import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../../services';

@Component({
  selector: 'app-users-root',
  imports: [RouterOutlet],
  templateUrl: './users-root.page.html',
  styleUrl: './users-root.page.scss',
})
export class UsersRootPage {

  usersService = inject(UsersService);

  constructor() {
    this.usersService.loadUsers();
  }
}
