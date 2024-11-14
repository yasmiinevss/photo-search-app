import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlickrPhoto } from '../services/flickr.service';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FlickrService } from '../services/flickr.service';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    MatButtonToggleModule,
    MatExpansionModule
    ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})

export class ResultsComponent {

  // Toutes les photos obtenus apres la requete
  @Input() photos: FlickrPhoto[] = [];

  //Filtres
  filters = {
    minTakenDate: '',
    maxTakenDate: '',
    maxUploadDate:'',
    minUploadDate:'',
    //media: '' 
  };
  
 // media: 'tous' | 'photos' | 'videos' = 'tous'; // Medias par defaut -> tous les medias

  constructor(private flickrService: FlickrService) {}


  @Output() photoSelected = new EventEmitter<string>();
  onSelectPhoto(photoId: string) {
    this.photoSelected.emit(photoId);

  }
  
  applyFilters() {

  // Defini le filtre media en fonction de ce que l'user a choisit
  //this.filters.media = this.media === 'tous' ? '' : this.media;

  // Apl de la requete avec les filtres 
  this.flickrService.photoFilter(this.filters).subscribe(photos => {
      this.photos = photos;
    });
}
}
