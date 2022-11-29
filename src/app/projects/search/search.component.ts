import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

Search:String='';

@Output()
SearchTextchanged :EventEmitter <String>=new EventEmitter<String>() ;

onSearchchanged(){
  this.SearchTextchanged.emit(this.Search);
  console.log(this.Search);
}

}
