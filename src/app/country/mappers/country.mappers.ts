import { Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-country.interface";

export class CountryMapper{


  static getCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      name: restCountry.translations['spa'].common ?? 'NameLess',
      capital: restCountry.capital?.join(', '),
      flagIcon: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion
    };
  }

  static getCountries(restCountries: RestCountry[]): Country[] {

    if(!restCountries || restCountries.length == 0)
      return [];

    return restCountries.map(rc => CountryMapper.getCountry(rc));
  }
}
