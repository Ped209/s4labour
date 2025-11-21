import { Component, inject, Input } from '@angular/core';
import { ButtonFavourite } from '@shared/components/controls/button-favourite/button-favourite';
import { User } from '@users/types';
import { UsersService } from '@users/services/user.service';

@Component({
  selector: 'app-button-favourite-user',
  imports: [ButtonFavourite],
  templateUrl: './button-favourite-user.html',
  styleUrl: './button-favourite-user.scss',
})
export class ButtonFavouriteUser {
  usersService = inject(UsersService);

  @Input({ required: true }) user!: User;

  favouriteToggled(isFavourite: boolean) {
    this.usersService.setFavourite(this.user.login.uuid, isFavourite);
  }
}
