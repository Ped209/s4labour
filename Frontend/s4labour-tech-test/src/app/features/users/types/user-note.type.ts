export interface UserNote {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
}

export interface CreateUserNoteRequest {
    userId: string;
    content: string;
}