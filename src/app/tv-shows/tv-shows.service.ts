import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShow } from '../models/tv-show.model';


@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  private apiUrl: string = 'http://localhost:5203/api/tvshows'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los TV shows
  getTvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(this.apiUrl);
  }

  // Obtener un TV show por su ID
  getTvShow(id: number): Observable<TvShow> {
    return this.http.get<TvShow>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo TV show
  addTvShow(tvShow: TvShow): Observable<TvShow> {
    return this.http.post<TvShow>(this.apiUrl, tvShow);
  }

  // Actualizar un TV show existente
  updateTvShow(id: number, tvShow: TvShow): Observable<TvShow> {
    return this.http.put<TvShow>(`${this.apiUrl}/${id}`, tvShow);
  }

  // Eliminar un TV show
  deleteTvShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
