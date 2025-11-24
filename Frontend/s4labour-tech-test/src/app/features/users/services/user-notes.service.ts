import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { UserNote } from '../types';

@Injectable({ providedIn: 'root' })
export class UsersNotesService {
    private http = inject(HttpClient);

    getUserNotes(userId: string): Observable<UserNote[]> {
        return this.http.get<UserNote[]>(`${environment.urls.coreApi}/UserNotes/${userId}`);
    }

    create(userId: string, content: string): Observable<UserNote> {
        return this.http.post<UserNote>(`${environment.urls.coreApi}/UserNotes`, {
            userId,
            content,
        });
    }
}