import { Component, Input, OnChanges } from '@angular/core';
import { FlickrService, FlickrPhoto } from '../services/flickr.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

getFormattedPublicationDate() {
  // Formattage de la date
  if (this.photoDetails && this.photoDetails.photo.dates.posted) {
    const timestamp = Number(this.photoDetails.photo.dates.posted) * 1000;
    return new Date(timestamp).toLocaleString();
  }
  return 'Date indisponible...'
}

  photoId: string | null = null;
  photoDetails: any = null;// Details de la photo -> rempli apres la rqt
  comments: any[] = []; //Commentaires de la photo
  
  constructor(private route: ActivatedRoute, private flickrService: FlickrService) {
    this.photoId = this.route.snapshot.paramMap.get('id'); // Recup l'ID dans l'url de la route
  }

  ngOnInit() {
    if (this.photoId) {
      this.flickrService.getPhotoDetails(this.photoId).subscribe(details => {
        this.photoDetails = details;
        console.log('Details :', this.photoDetails);
        const userId = this.photoDetails?.photo?.owner?.nsid;
        console.log("User ID: " + userId);

        if (userId) {
          this.loadAuthorPhotos(userId);
        }
        
      });
    }

    
  }

  authorPhotos: any[] = [];

  // Charger les autres photos de l'auteur
  loadAuthorPhotos(userId: string): void {
    console.log("User ID: " + userId);
    this.flickrService.getOtherPics(userId).subscribe(response => {
      this.authorPhotos = response.photos.photo; 
    });
  }
  
}
