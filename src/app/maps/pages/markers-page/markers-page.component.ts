import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

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

    this.readFromLocalStorage();

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

      this.markers.push({ color, marker, });
      this.saveToLocalStorage();
  }

  //para eliminar un marcador
  deleteMarker( index: number ) {
    this.markers[index].marker.remove(); //eliminamos el marcador del mapa
    this.markers.splice( index, 1 ); //con doble clic eliminamos el marker de la dcha.
  }

  //para que te lleve al marcador, ejemplo el marcador puesto en colombia, pinchas en el colorMarker que lo tienes en madrid, y te lleva a Madrid con un click
  flyTo( marker: Marker) {

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  //guardar y leer del LocalStorage
  //creamos dos métodos
  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //!OJO!

    plainMarkers.forEach( ({ color, lngLat }) => {

      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color);
    })
  }

}
