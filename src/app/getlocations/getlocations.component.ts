import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../location.service';
import { ILocation } from '../model/location';

@Component({
  selector: 'app-getlocations',
  templateUrl: './getlocations.component.html',
  styleUrls: ['./getlocations.component.css']
})
export class GetlocationsComponent implements OnInit {
locationList: ILocation[];
message: String;
currentLocation: ILocation;

  constructor(private locationService: PlayerService) { }

  ngOnInit(): void {
    this.locationService.getLocation().subscribe({
      next:(value: ILocation[]) =>this.locationList = value,
      complete:() => console.log('location service done'),
      error:(mess) =>this.message = mess
    })
  }

  isSelected(location: ILocation): boolean{
    if (!location || !this.currentLocation) {
      return false;
    }
    else {
      return location.id === this.currentLocation.id;
    }
  }

  

 

}
