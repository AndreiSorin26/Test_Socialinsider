import { Component } from '@angular/core';
import {GetBrandsService} from "../services/get-brands-service";
import {GetProfileDataService} from "../services/get-profile-data-service";
import {Brand} from "../models/brand";

@Component({
  selector: 'brands-statistics',
  templateUrl: './brands-statistics.component.html',
  styleUrls: ['./brands-statistics.component.css']
})
export class BrandsStatisticsComponent
{
  brands: Brand[] = []
  brandsStatistics: {name: string, totalProfiles: number, totalFans: number, totalEngagement: number}[] = []
  constructor(private getBrandsService: GetBrandsService,
              private getProfileDataService: GetProfileDataService)
  {}

  ngOnInit()
  {
    this.getBrandsService.get().subscribe(brands => this.brands = brands);
  }

  updateStatistics(event: any): void
  {
    const value: string = event.target.value
    const day = value.split("-").at(2)!
    const month = value.split("-").at(1)!
    const year = value.split("-").at(0)!
    const timezone = "Europe/London"

    this.brandsStatistics = []
    for( let brand of this.brands )
      this.brandsStatistics.push({
        name: brand.brandname,
        totalProfiles: brand.profiles.length,
        totalFans: 0,
        totalEngagement: 0
      })

    for( let brand of this.brands )
      for( let profile of brand.profiles )
        this.getProfileDataService.get(day, month, year, timezone, profile.profile_type, profile.id).subscribe(profileData => {
          const aux = profileData[profile.id];
          const info = aux[Object.keys(aux).sort().at(0)!];

          let index: number = this.brands.indexOf(brand)
          if( info["followers"] )
            this.brandsStatistics[index].totalFans += info["followers"];
          if(info["engagement"])
            this.brandsStatistics[index].totalEngagement += info["engagement"];
        });
  }
}
