import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];
  //necesitamos la referencia al elemento mediante @ViewChild
  //lo copiamos de full-screen-page.component.ts
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit() {

    //necesitamos el mapa
    //lo copiamos de full-screen-page.component.ts
    if ( !this.divMap?.nativeElement ) throw "Map Div not found";
    if ( !this.lngLat ) throw "LngLat can't be null";

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    //marker
    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map )
  }

}
