import { Component, effect, inject, Input, LOCALE_ID, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UsersNotesService } from '@users/services';
import { IconMessage, LoadingSpinner } from "@app/shared/components";
import { UserNote } from '@users/types';
import { delay, finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeGb from '@angular/common/locales/en-GB';

registerLocaleData(localeGb);

@Component({
  selector: 'app-user-notes',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, ReactiveFormsModule, IconMessage, LoadingSpinner, DatePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
  templateUrl: './user-notes.html',
  styleUrl: './user-notes.scss',
})
export class UserNotes {
  userNotesService = inject(UsersNotesService);

  @Input() userId!: string;

  notes = signal<UserNote[]>([]);
  loading = signal(false);
  addingNote = signal(false);
  error = signal<string | null>(null);
  
  noteControl = new FormControl('', [Validators.required]);

  constructor() {
    effect(() => {
      if (this.userId) {
        this.loadNotes(this.userId);
      }
    });
  }

  loadNotes(userId: string) {
    this.loading.set(true);
    this.error.set(null);

    this.userNotesService.getUserNotes(userId)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: notes => this.notes.set(notes),
        error: () => this.error.set('Failed to load notes.')
      });
  }

  addNote() {
    if (this.noteControl.invalid) {
      this.noteControl.markAsTouched();
      return;
    }

    const content = this.noteControl.value!;
    
    this.addingNote.set(true);
    this.error.set(null);

    this.userNotesService.create(this.userId, content)
      .pipe(
        finalize(() => this.addingNote.set(false))
      )
      .subscribe({
        next: () => {
          this.loadNotes(this.userId);
          this.noteControl.reset();
        },
        error: () => this.error.set('Failed to load notes.')
      });
  }
}
