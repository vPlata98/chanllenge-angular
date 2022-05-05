import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BuscadorComponent } from './views/buscador/buscador.component';
import { SeriesComponent } from './views/series/series.component';
import { PeliculasComponent } from './views/peliculas/peliculas.component';
import { MilistaComponent } from './views/milista/milista.component';
import { MiperfilComponent } from './views/miperfil/miperfil.component';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ImgNotFoundDirective } from './shared/directives/img-not-found.directive';
import { FilmeDetalleComponent } from './views/filme-detalle/filme-detalle.component';
import { RatingComponent } from './views/rating/rating.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BuscadorComponent,
    SeriesComponent,
    PeliculasComponent,
    MilistaComponent,
    MiperfilComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ImgNotFoundDirective,
    FilmeDetalleComponent,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
