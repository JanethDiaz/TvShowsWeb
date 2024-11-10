import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DialogComponent } from './dialog/dialog.component';
import { TvShowsService } from './tv-shows.service';
import { TvShow } from '../models/tv-show.model';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    DialogComponent
  ]
})
export class TvShowsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'favorite', 'actions'];
  dataSource: TvShow[] = [];

  constructor(public dialog: MatDialog, private tvShowService: TvShowsService) {}

  // Carga los TV Shows desde el servicio
  ngOnInit(): void {
    this.loadTvShows();
  }

  // Carga los TV Shows desde el servicio
  loadTvShows() {
    this.tvShowService.getTvShows().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error loading TV shows:', error);
      }
    );
  }

  // Elimina un TV Show por su ID
  deleteTvShow(id: number): void {
    this.tvShowService.deleteTvShow(id).subscribe(
      () => {
        console.log('TV Show deleted');
        this.loadTvShows();
      },
      (error) => console.error('Error deleting TV show:', error)
    );
  }
  
  // Abre el diálogo para agregar o editar un TV Show
  openDialog(tvShow?: TvShow): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { tvShow }  
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTvShows();
      }
    });
  }
}
