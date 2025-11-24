import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ButtonFavourite } from '@shared/components/controls/button-favourite/button-favourite';
import { User } from '@users/types';
import { UsersStore } from '@users/stores';

@Component({
  selector: 'app-button-favourite-user',
  imports: [ButtonFavourite],
  templateUrl: './button-favourite-user.html',
  styleUrl: './button-favourite-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonFavouriteUser {
  usersStore = inject(UsersStore);

  @Input({ required: true }) user!: User;

  favouriteToggled(isFavourite: boolean) {
    this.usersStore.setFavourite(this.user.login.uuid, isFavourite);
  }
}
