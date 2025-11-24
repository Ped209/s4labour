import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersNotesService } from '@users/services';
import { IconMessage, LoadingSpinner } from "@app/shared/components";

@Component({
  selector: 'app-user-notes',
  imports: [MatCardModule, IconMessage, LoadingSpinner],
  templateUrl: './user-notes.html',
  styleUrl: './user-notes.scss',
})
export class UserNotes {
  usersNotesService = inject(UsersNotesService);

  @Input() userId!: string;

  constructor() {
    this.usersNotesService.loadNotes(this.userId);
  }
}
