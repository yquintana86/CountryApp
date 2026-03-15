import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
  styles: ``
})
export default class ByCountryComponent {

  #countryService = inject(CountryService);
  countrySearchValue = signal('');


  countryResource = rxResource({
    request: () => ({value: this.countrySearchValue()}),
    loader: ({request}) => {
      if(!request.value) return of([]);
      return this.#countryService.searchByCountry(request.value);
    }
  });

  // countryResource = resource({
  //   request: () => ({value: this.countrySearchValue()}),
  //   loader: async ({request}) => {
  //     if(!request.value) return [];

  //     return await firstValueFrom(
  //      this.#countryService.searchByCountry(request.value)
  //     );

  //   }
  // })


}
