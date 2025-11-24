import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { UserNote } from '../types';

@Injectable({ providedIn: 'root' })
export class UsersNotesService {
    private http = inject(HttpClient);

    // STATE SIGNALS
    notes = signal<UserNote[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    constructor() {
        let previous: Record<string, boolean> = {};
    }

    async loadNotes(userId: string): Promise<void> {
        this.loading.set(true);
        this.error.set(null);

        try {
            // Add 1 second delay for testing loading spinner
            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = await firstValueFrom(
                this.http.get<UserNote[]>(`${environment.urls.coreApi}/UserNotes/${userId}`)
            );

            this.notes.set(result);
        } catch (err) {
            this.error.set('Failed to load notes.');
        } finally {
            this.loading.set(false);
        }
    }
}