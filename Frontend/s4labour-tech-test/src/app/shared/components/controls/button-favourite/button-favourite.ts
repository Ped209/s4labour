import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-favourite',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button-favourite.html',
  styleUrl: './button-favourite.scss',
})
export class ButtonFavourite {
  @Input() isFavourite!: boolean;
  @Output() toggle = new EventEmitter<boolean>();

  onToggle() {
    this.isFavourite = !this.isFavourite;
    this.toggle.emit(this.isFavourite);
  }
}
