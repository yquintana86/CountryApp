import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',
  styles: ``
})
export default class ByCapitalComponent implements OnInit  {

  #countryService = inject(CountryService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  // #countries = signal<Country[]>([]);
  // countries = computed(() => this.#countries());

  searchValue = signal('');



  // A resource is no more than a function which receive an object composed by two fields, but you could use resources with 'resource' which work only with promises
  // or with 'rxResource' which work with observables.
  //request-> is a callback which return an object or a signal value. Its recommended that its return an object because we always can expand the object
  //loader -> is an async function  which receive an object with fiels like the request we created, 'abortSignal' and 'previous' the before value.
  // That's why its been  destructured
  //Every time the 'searchValue' signal change the resource is executed
  countryResource = rxResource({
    request: () => ({query: this.searchValue()}),
    loader: ({request}) => {

      if(!request.query) return of([]);
      //Resources is an experimental feature for the moment and it always should return a promise not an Observable
      //there is an rxjs function with gets an observable an return a promise called "firstValueFrom"

      return this.#countryService.searchByCapital(request.query);
    }
  })


  public navigateToQuery(queryValue: string): void
  {
    if(!queryValue){
      this.#router.navigateByUrl('/country/by-capital');
      return;
    }

    this.#router.navigate(['/country/by-capital'],{
      queryParams:{
        query:queryValue
      }
      });
  }

  ngOnInit(): void {
    const query = this.#activatedRoute.queryParams
                .subscribe(({query}) => {
                  this.searchValue.set(query ?? '');
                });
  }
  // A resource is no more than a function which receive an object composed by two fields
  //request-> is a callback which return an object or a signal value. Its recommended that its return an object because we always can expand the object
  //loader -> is an async function  which receive an object with fiels like the request we created, 'abortSignal' and 'previous' the before value.
  // That's why its been  destructured
  //Every time the 'searchValue' signal change the resource is executed
  // countryResource = resource({
    //   request: () => ({query: this.searchValue()}),
    //   loader: async({request}) => {

  //     if(!request.query) return [];
        //Resources is an experimental feature for the moment and it always should return a promise not an Observable
        //there is an rxjs function with gets an observable an return a promise called "firstValueFrom"

  //     return await firstValueFrom(
  //       this.#countryService.searchByCapital(request.query)
  //     );
  //   }
  // })

//   isLoading = signal(false);
//   error = signal<string | null>(null);


//   public search(txt: string) : void {

// const a = this.isLoading();
//     if(this.isLoading())
//       return;

//     this.isLoading.set(true);
//     this.error.set(null);

//     this.#countryService.searchByCapital(txt)
//     .subscribe({
//       next:(resp) => {
//         this.#countries.set(resp);
//       },
//       error:(err) => {
//         this.isLoading.set(false);
//         this.error.set(err);
//       }
//     });

//     this.isLoading.set(false);
//   }

}
