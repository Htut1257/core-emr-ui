import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from 'src/app/core/model/location.model';
import { LocationService } from 'src/app/core/services/location-service/location.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  locations: Location[] = []

  dataSource: MatTableDataSource<Location>
  displayedColumn: string[] = ["position","name"]

  constructor(
    private locationService: LocationService, private commonService: CommonServiceService,
    private toastService: ToastService
  ) {
    this.dataSource = new MatTableDataSource<Location>(this.locations)
    this.locationService.locations$.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getLocation()
  }

  getLocation() {
    this.locationService.getLocation().subscribe({
      next: locations => {
        console.log(locations)
        this.locations = locations
        this.dataSource.data = this.locations
      },
      error: err => {
        console.trace(err)
      }
    })
  }


  getRowData(data: Location) {

  }

}
