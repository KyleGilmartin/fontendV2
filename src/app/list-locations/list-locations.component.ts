import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PlayerService } from '../location.service';
import { ILocation } from '../model/location';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit {
  @Input() location: ILocation;
  lat;
  lon;
  weather;

  closeResult: string;

  constructor(private modalService: NgbModal, private weatherService: WeatherService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        console.log(this.lat, this.lon);

        this.weatherService.getWeatherDataByCoods(this.lat, this.lon).subscribe(data => {
          this.weather = data;
          console.log(this.weather.weather[0].icon)

        })
      })
    }
  }

  getCity(city) {
    this.weatherService.getWeatherDatabyCity(city).subscribe(data => {
      this.weather = data;
    })
  }




}
