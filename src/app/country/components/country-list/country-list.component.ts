import { Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/rest-country.interface';
import { Country } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {

  countryList = input<Country[]>([]);


}
