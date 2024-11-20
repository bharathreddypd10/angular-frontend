import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-googlemaps',
  standalone: true,
  imports: [GoogleMapsModule,MatDialogModule],
  templateUrl: './googlemaps.component.html',
  styleUrl: './googlemaps.component.css'
})
export class GooglemapsComponent implements AfterViewInit{


  center: google.maps.LatLngLiteral = { lat: 17.3850, lng: 78.4867 }; // Hyderabad coordinates
  zoom = 12;
  selectedLocation: google.maps.LatLngLiteral | null = null;
  address: string | null = null;
  autocomplete!: google.maps.places.Autocomplete;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef; // Reference to search input
  constructor(public dialogRef: MatDialogRef<GooglemapsComponent>) {}

  ngAfterViewInit() {
    // Initialize Autocomplete after the view is loaded
    const input = document.getElementById('search') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input);

    // Listen to the place_changed event
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        // Set the map's center to the selected place's location
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.zoom = 15;

        // Update selected location and get the formatted address
        this.selectedLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.address = place.formatted_address || null;
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.getAddressFromLatLng(this.selectedLocation.lat, this.selectedLocation.lng);
    }
  }

  getAddressFromLatLng(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          console.log('Address:', this.address); // You can see the formatted address here
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to:', status);
      }
    });
  }

  confirmLocation() {
    if (this.address) {
      this.dialogRef.close({
        address: this.address
      }); // Pass the selected location back to the form component
    }
  }

}
