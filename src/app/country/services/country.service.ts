import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, of, map, catchError, throwError, tap } from 'rxjs';
import { RestCountry } from '../interfaces/rest-country.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mappers';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  #_httpClient = inject(HttpClient);
  #apiURL = environment.countryBaseApiUrl;
  #apiVersion = environment.countryBaseApiVer;
  #queryCacheCapital = new Map<string,Country[]>();
  #queryCacheCountry = new Map<string,Country[]>();
  #queryCacheRegion = new Map<string,Country[]>();


  public searchByCapital(capitalTxt: string) : Observable<Country[]>{

    if(!capitalTxt) return of([]);

    if(this.#queryCacheCapital.has(capitalTxt)){
      return of(this.#queryCacheCapital.get(capitalTxt) ?? []);
    }

    const baseUri = `${this.#apiURL}/${this.#apiVersion}/capital/${capitalTxt}`;
    return this.#_httpClient.get<RestCountry[]>(baseUri)
            .pipe(
              map(resp => CountryMapper.getCountries(resp)),
              tap(countries => this.#queryCacheCapital.set(capitalTxt,countries)),
              catchError(err => throwError(() => new Error(`No country was found with the capital: ${capitalTxt}`)))
            );
  }

  public searchByCountry(countryTxt: string): Observable<Country[]> {
    if(!countryTxt) return of([]);

    if(this.#queryCacheCountry.has(countryTxt)){
      return of(this.#queryCacheCountry.get(countryTxt) ?? []);
    }

    const baseUri =  `${this.#apiURL}/${this.#apiVersion}/name/${countryTxt}`;
    return this.#_httpClient.get<RestCountry[]>(baseUri)
            .pipe(
              map(resp => CountryMapper.getCountries(resp)),
              tap(countries => this.#queryCacheCountry.set(countryTxt,countries)),
              catchError(err => throwError(() => new Error(`No country was found with the capital: ${countryTxt}`)))
            );

  }

  public searchByAlphaCode(code: string): Observable<Country | undefined> {
    if(!code) return of(undefined);

    const baseUri =  `${this.#apiURL}/${this.#apiVersion}/alpha/${code}`;
    return this.#_httpClient.get<RestCountry[]>(baseUri)
            .pipe(
              map(resp => CountryMapper.getCountries(resp)),
              map(countries => countries[0]),
              catchError(() => throwError(() => new Error(`No country was found with the code: ${code}`)))
            );

  }

  public searchByRegion(region: Region): Observable<Country[]> {

    if(this.#queryCacheRegion.has(region))
      return of(this.#queryCacheRegion.get(region) ?? []);

    const baseUri =  `${this.#apiURL}/${this.#apiVersion}/region/${region}`;
    return this.#_httpClient.get<RestCountry[]>(baseUri)
            .pipe(
              map(resp => CountryMapper.getCountries(resp)),
              tap(countries => this.#queryCacheRegion.set(region,countries)),
              catchError(() => throwError(() => new Error(`No country was found with the region: ${region}`)))
            );

  }
}
