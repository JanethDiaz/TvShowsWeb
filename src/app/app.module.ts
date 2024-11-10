// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa este módulo
import { AppComponent } from './app.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    TvShowsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
