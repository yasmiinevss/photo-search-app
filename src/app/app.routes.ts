import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Page d'accueil
    { path: 'details/:id', component: DetailsComponent }, // Page details photo
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }