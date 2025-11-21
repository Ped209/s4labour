import { Component, effect, inject, Input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '@users/types';
import { ButtonFavouriteUser } from '../button-favourite-user/button-favourite-user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, ButtonFavouriteUser],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
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

    // Custom filter predicate to only filter on name
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
