import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {environment} from '../environment/environment';


/** Interface de la photo */
export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
  media: string;
}
/****************************/



/** Interface du resultat
 * Un tableau pour stocker tous les res */
export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}
/*******************************/




@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private url = 'https://www.flickr.com/services/rest/';// Url de base flickr
  private word = "";
  constructor(private http: HttpClient) { }

  /** Methode de recherche avec un mot cle tape sur la barre de recherche*/
  searchWithWord(word: string): Observable<FlickrPhoto[]> {
    const params = {
      method: 'flickr.photos.search',
      api_key: environment.flickrApiKey,
      text: word,
      format: 'json',
      nojsoncallback: '1',
      tag_mode: 'any',
      min_upload_date: '',
      max_upload_date: '',
      min_taken_date: '',
      max_taken_date: '',
      media:'',
      sort: 'date-posted-desc',
      privacy_filter: '1',
      safe_search: '1'
    };

    // requete qui renvoie  le tableau de photos
    return this.http.get<FlickrOutput>(this.url, { params }).pipe(
      map((res: FlickrOutput) => res.photos.photo)
    );
  }

  /*
  // Requete pour avoir les autre photos de l'auteur
  getOtherPics(userId: string): Observable<any> {
      const params = {
        method: 'flickr.people.getPublicPhotos',
        api_key: environment.flickrApiKey,
        user_id: userId,
        format: 'json',
        nojsoncallback: '1'
      };
  
      return this.http.get<any>(this.url, { params });
    }
  */

 


  // Methode de recherche sur une recherche deja lancee mais en rajt des filtres
  photoFilter(filters: any): Observable<FlickrPhoto[]> {
    const params = {
      method: 'flickr.photos.search',
      api_key: environment.flickrApiKey,
      text: filters.tags || '',
      format: 'json',
      nojsoncallback: '1',
      tag_mode: 'any',
      min_upload_date: filters.minUploadDate || '',
      max_upload_date: filters.maxUploadDate || '',
      min_taken_date: filters.minTakenDate || '',
      max_taken_date: filters.maxTakenDate || '',
      media: filters.media || '',
      sort: 'date-posted-desc',
      privacy_filter: '1',
      safe_search: '1'
    };

    return this.http.get<FlickrOutput>(this.url, { params }).pipe(
      map((res: FlickrOutput) => {
        return res.photos.photo.map(photo => {
          if (filters.media) {
            photo.media = filters.media;
          }
          return photo;
        });
      })
    );
  }

 /** Recuperer les commentaires de la photo  */
  getComments(photoId: string): Observable<any> {
      const params = {
        method: 'flickr.photos.comments.getList',
        api_key: environment.flickrApiKey,
        photo_id: photoId,
        format: 'json',
        nojsoncallback: '1'
      };
  
      
      return this.http.get<any>(this.url, { params });
    }
    
  getPhotoDetails(photoId: string): Observable<any> {
    const params = {
      method: 'flickr.photos.getInfo',
      api_key: environment.flickrApiKey,
      photo_id: photoId,
      format: 'json',
      nojsoncallback: '1'
    };

    return this.http.get<any>(this.url, { params });
  }

  // autres photos ->  seule diff c userId au lieu de photoId
  getOtherPics(userId: string): Observable<any> {
      const params = {
        method: 'flickr.people.getPublicPhotos',
        api_key: environment.flickrApiKey,
        user_id: userId,                 
        format: 'json',
        nojsoncallback: '1'
      };
  
      return this.http.get<any>(this.url, { params });
  }
}
