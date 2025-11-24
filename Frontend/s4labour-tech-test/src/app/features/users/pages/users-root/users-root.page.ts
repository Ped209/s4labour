import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconMessage, LoadingSpinner } from "@app/shared/components";
import { UsersStore } from '../../stores';

@Component({
  selector: 'app-users-root',
  imports: [RouterOutlet, IconMessage, LoadingSpinner],
  templateUrl: './users-root.page.html',
  styleUrl: './users-root.page.scss',
})
export class UsersRootPage {

  usersStore = inject(UsersStore);

  constructor() {

  }
}
