import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cita } from 'src/app/Modelo/Cita';
import { IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonText, IonList } from "@ionic/angular/standalone";
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GestionCitasService } from 'src/app/Servicios/gestion-citas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonItem, IonContent, ReactiveFormsModule, IonTitle, IonButton, FormsModule, IonText, CommonModule]
})
export class FormularioComponent implements OnInit {

    // Define el formulario reactivo con los controles y sus validadores
    CitaForm = new FormGroup({
      frase: new FormControl('', [
        Validators.required,
        Validators.minLength(5)  // Mínimo 5 caracteres
      ]),
      autor: new FormControl('', [
        Validators.required,
        Validators.minLength(2)  // Mínimo 2 caracteres
      ])
    });
  
    @Output() onCreate = new EventEmitter<Cita>(); 
  
    constructor(private AgregarcitaService: GestionCitasService) { }
  
    ngOnInit() {}
  
    // Método que se ejecuta al enviar el formulario
    onClick(): void {
      // Verificar que el formulario es válido
      if (this.CitaForm.valid) {
        // Crear un objeto Cita a partir de los valores del formulario
        const nuevaCita: Cita = {
          frase: this.CitaForm.value.frase || '',  // Si frase es null o undefined, asignar un valor vacío
          autor: this.CitaForm.value.autor || ''   // Si autor es null o undefined, asignar un valor vacío
        };
        
        // Llamar al servicio para agregar la cita
        this.AgregarcitaService.agregarCita(nuevaCita);
  
        // Emitir la cita para el componente padre
        this.onCreate.emit(nuevaCita);
  
        // Limpiar el formulario
        this.CitaForm.reset();
      }
    }
  
    // Método para verificar si el formulario es válido
    get isFormValid() {
      return this.CitaForm.valid;
    }
  }