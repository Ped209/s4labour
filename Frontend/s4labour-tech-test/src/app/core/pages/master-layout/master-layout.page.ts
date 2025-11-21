import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "@core/components";

@Component({
  selector: 'app-master-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './master-layout.page.html',
  styleUrl: './master-layout.page.scss',
})
export class MasterLayoutPage {

}
