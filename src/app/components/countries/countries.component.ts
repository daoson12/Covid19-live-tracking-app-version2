import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './../../services/data-service.service';

import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from './models/gloabl-data';
import { DateWiseData } from './models/date-wise-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  p: number = 1;
  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData;
  loading = true;
  options: {
    height: 500,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  }

  constructor(private service: DataServiceService) { }

  ngOnInit() {
    this.getCountries()
  }


  getCountries() {
    merge(
      this.service.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.service.getGloblData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('Nigeria')
         this.loading = false;
        }
      }
    )
  }

  updateChart(){
    let dataTable = [];
    dataTable.push(["Date" , 'Cases'])
    this.selectedCountryData.forEach(cs=>{
      dataTable.push([cs.date , cs.cases])
    })

   
  }

  updateValues(country : string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    }); 
    this.selectedCountryData  = this.dateWiseData[country]   
    this.updateChart();
   }
}
