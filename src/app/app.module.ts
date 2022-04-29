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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
