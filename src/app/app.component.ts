import { Component } from '@angular/core';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TvShowsComponent, HttpClientModule]  
})
export class AppComponent {
  title = 'tu-app';
}
