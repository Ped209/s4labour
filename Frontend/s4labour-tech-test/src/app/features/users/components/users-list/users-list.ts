import { Component, effect, Input, Signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../types';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {

  @Input({ required: true }) users!: Signal<User[]>;

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['picture', 'name', 'email', 'phone'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.users();
    });
  }
}
