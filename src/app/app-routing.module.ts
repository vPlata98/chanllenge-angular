import { AppComponent } from './app.component';
import { SeriesComponent } from './views/series/series.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { BuscadorComponent } from './views/buscador/buscador.component';
import { MilistaComponent } from './views/milista/milista.component';
import { PeliculasComponent } from './views/peliculas/peliculas.component';
import { MiperfilComponent } from './views/miperfil/miperfil.component';
import { HomeComponent } from './views/home/home.component';
import { FilmeDetalleComponent } from './views/filme-detalle/filme-detalle.component';



const routes: Routes = [
  {
    path:'home', component: HomeComponent
  },
  {
    path:'menu', component: MenuComponent
  },
  {
    path:'series', component: SeriesComponent
  },
  {
    path:'peliculas', component: PeliculasComponent
  },
  {
    path:'milista', component: MilistaComponent
  },
  {
    path:'miperfil', component: MiperfilComponent
  },
  {
    path:'buscador', component: BuscadorComponent
  },
  {
    path:'detalle/:categoria/:id', component: FilmeDetalleComponent
  },
  {
    path:'', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path:'**', redirectTo: '/home', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
