import { Component } from '@angular/core';
import { FlickrPhoto, FlickrService } from '../services/flickr.service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {CommonModule} from '@angular/common';
import {ResultsComponent} from '../results/results.component';
import { DetailsComponent } from '../details/details.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    ResultsComponent,
    DetailsComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// Page d'accueil de l'API
export class HomeComponent {

  photos: FlickrPhoto[] = [];// Stocker les resultats de recherche
  selectedPhotoId: string | null = null; 

  constructor(private flickrService: FlickrService) {}

  onSearch(keyword: string) {
    this.flickrService.searchWithWord(keyword).subscribe(photos => {
      this.photos = photos.filter(photo => photo.farm !== "0" && photo.server !== "0");
    });
  }
  onPhotoSelected(photoId: string) {
    this.selectedPhotoId = photoId;
  }
}
