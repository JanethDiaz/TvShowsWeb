import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TvShowsService } from '../tv-shows.service';
import { TvShow } from '../../models/tv-show.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class DialogComponent implements OnInit {
  tvShowForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogComponent>,
              private tvShowsService: TvShowsService,
              @Inject(MAT_DIALOG_DATA) public data: { tvShow?: TvShow }) { }

  // Inicializa el formulario y determina si estamos en modo edición
  ngOnInit() {
    this.isEditMode = !!this.data.tvShow;
    this.tvShowForm = this.fb.group({
      name: [this.data.tvShow?.name || '', Validators.required],
      favorite: [this.data.tvShow?.favorite || false]
    });
  }

  // Guarda los datos del formulario (agregar o actualizar TV Show)
  onSave() {
    if (this.tvShowForm.valid) {
      const tvShowData = this.tvShowForm.value;
      if (this.isEditMode && this.data.tvShow) {
        this.tvShowsService.updateTvShow(this.data.tvShow.id, tvShowData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => console.error('Error updating TV show:', error)
        });
      } else {
        this.tvShowsService.addTvShow(tvShowData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => console.error('Error adding TV show:', error)
        });
      }
    }
  }

  // Cierra el diálogo sin realizar ninguna acción
  onCancel() {
    this.dialogRef.close(false);
  }
}
