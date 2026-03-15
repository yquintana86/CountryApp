import { Component, computed, inject, signal, resource } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CommonModule } from '@angular/common';
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { of, single } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent, CommonModule, NotFoundComponent],
  templateUrl: './by-region.component.html',
  styles: ``
})
export default class ByRegionComponent {

  #countryService = inject(CountryService);
  selectedRegion = signal<Region | null>(null);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countriesResource = rxResource({
    request:() => ({region:this.selectedRegion()}),
    loader: ({request}) => {
      if(!request.region) return of([]);
        return this.#countryService.searchByRegion(request.region!);
    }
  })








}
