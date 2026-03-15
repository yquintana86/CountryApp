import { Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styles: ``
})
export class SearchInputComponent {
  public searchElementSgnl = viewChild<ElementRef<HTMLInputElement>>('searchtxt');
  public searchValue = output<string>();
  public placeholder = input<string>('Search');
  public initialValue = input<string>('');


  public emitSearchTxt() : void{
    const searchElement =  this.searchElementSgnl()?.nativeElement;
    const searchTxt =  searchElement?.value;
    if(!searchTxt)
      return;

    this.searchValue.emit(searchTxt);
    searchElement.value = '';

  }

}
