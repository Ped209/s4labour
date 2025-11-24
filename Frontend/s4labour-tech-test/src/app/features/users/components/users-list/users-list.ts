import { Component, inject, Input, Signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@users/types';
import { ButtonFavouriteUser } from '../button-favourite-user/button-favourite-user';
import { IconMessage } from '@app/shared/components';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ButtonFavouriteUser,
    IconMessage
  ],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
})
export class UsersList {
  private router = inject(Router);

  @Input({ required: true }) users!: Signal<User[]>;

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['picture', 'name', 'email', 'phone', 'actions'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.users();
    });

    // Filter only by name
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const fullName = `${data.name.first} ${data.name.last}`.toLowerCase();
      return fullName.includes(filter);
    };
  }

  navigateToUser(user: User): void {
    this.router.navigate(['/users', user.login.uuid]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
