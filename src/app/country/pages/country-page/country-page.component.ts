import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styles: ``
})
export default class CountryPageComponent {

  #countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  code = this.activatedRoute.snapshot.params['code'];

  countryResource = rxResource({
    request:() => ({code: this.code }),
    loader:({request}) => {
      return this.#countryService.searchByAlphaCode(request.code);
    }
  })


  // ngOnInit(): void {

  //   this.activatedRoute.params
  //       .subscribe(({code}) => {
  //           this.#countryService.searchByAlphaCode(code)
  //               .subscribe(country =>{
  //                 this.country.set(country);
  //                 }
  //               )
  //             }
  //           )
  // }

}

