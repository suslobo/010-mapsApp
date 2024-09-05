
import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";

@Component({
  //como va a ser una pag. podemos obviar el selector porque no lo vamos a ocupar
  // selector: 'app-alone-page',
  standalone: true,
  imports: [CounterAloneComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css',

})
export class AlonePageComponent {

}
