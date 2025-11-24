import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IconMessageDetails } from '@app/shared/types';

@Component({
  selector: 'app-icon-message',
  imports: [MatIconModule, RouterLink],
  templateUrl: './icon-message.html',
  styleUrl: './icon-message.scss',
})
export class IconMessage {
  @Input() iconMessageDetails!: IconMessageDetails;
}
