import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {environment} from './app/environment/environment';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import { DetailsComponent } from './app/details/details.component';
import { HomeComponent } from './app/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'details/:id', component: DetailsComponent }, // Page de détails
];

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      importProvidersFrom(RouterModule.forRoot(routes)), provideAnimationsAsync()

    ]
  }
).catch(err => console.error(err));
let AppModule;

