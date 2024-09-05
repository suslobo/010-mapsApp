
import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  //como va a ser una pag. podemos obviar el selector porque no lo vamos a ocupar
  // selector: 'app-alone-page',
  standalone: true,
  imports: [CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css',

})
export class AlonePageComponent {

}
