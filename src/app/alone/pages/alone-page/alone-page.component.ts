import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  //como va a ser una pag. podemos obviar el selector porque no lo vamos a ocupar
  // selector: 'app-alone-page',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
