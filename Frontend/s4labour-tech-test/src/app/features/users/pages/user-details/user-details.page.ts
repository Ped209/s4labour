import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ButtonFavouriteUser, UserNotes } from "../../components";
import { IconMessage } from '@app/shared/components';
import { UsersStore } from '@users/stores';

@Component({
  selector: 'app-user-details',
  imports: [MatCardModule, MatIconModule, DatePipe, ButtonFavouriteUser, IconMessage, UserNotes],
  templateUrl: './user-details.page.html',
  styleUrl: './user-details.page.scss',
})
export class UserDetailsPage {
  private route = inject(ActivatedRoute);
  usersStore = inject(UsersStore);

  userId = this.route.snapshot.paramMap.get('id');

  user = computed(() => 
    this.usersStore.users().find(u => u.login.uuid === this.userId)
  );

}
