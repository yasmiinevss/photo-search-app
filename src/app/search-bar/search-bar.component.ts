import { Component,Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  
  //Mot saisi par l'utilisateur sur la barre de rch
  keyword: string = '';

  @Output() search = new EventEmitter<string>();// Evnmt pour emettre keyword

  onSearch() {
    this.search.emit(this.keyword);// Compo parent recoit et traite le mot
  }
}

