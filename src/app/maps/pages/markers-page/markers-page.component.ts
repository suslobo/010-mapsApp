import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.9790288940621, 39.92398834469088);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    //creamos un elemento HTML
    /* const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Fernando Herrera'

    const marker = new Marker({
      color: 'red',
      element: markerHtml
    })
      .setLngLat( this.currentLngLat )
      .addTo( this.map );
 */
  }

  //creamos otro método
  createMarker() {
    if ( !this.map ) return; //si no existe no hagamos nada

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  //crear marcadores dinámicos
  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return; //si el mapa no está establecido no hago nada

    const marker = new Marker({
      color: color,
      draggable: true

    })
      .setLngLat( lngLat )
      .addTo( this.map );

  }
}
