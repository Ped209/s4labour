import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersList } from '../../components';
import { UsersService } from '../../services';

@Component({
  selector: 'app-users',
  imports: [MatCardModule, UsersList],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
})
export class UsersPage {
  usersService = inject(UsersService);
}
