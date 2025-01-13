import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonButtons, IonTitle, IonToolbar, IonList, IonButton, IonItem, IonLabel, IonIcon, IonBackButton } from '@ionic/angular/standalone';
import { Cita } from 'src/app/Modelo/Cita';
import { GestionCitasService } from 'src/app/Servicios/gestion-citas.service';
import { FormularioComponent } from 'src/app/Componentes/formulario/formulario.component';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonIcon, IonButtons, IonLabel, IonItem, IonButton, IonList, IonContent, FormularioComponent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GestionCitasPage implements OnInit {
    citas: Cita[] = [];
  
    constructor(private CitaService: GestionCitasService) {}
  
    async ngOnInit() {
      await this.CitaService.iniciarPlugin();
      this._actualizar();
    }
  
    async _actualizar() {
      this.citas = await this.CitaService.getCitas();
    }
  
    async onCreateCita(nuevaCita: Cita) {
      await this.CitaService.agregarCita(nuevaCita);
      this._actualizar(); // Actualiza la lista de citas después de agregar una nueva
    }
  
    async eliminarCita(id: number) {
      if (id) {
        await this.CitaService.eliminarCita(id); // Elimina la cita con el id correspondiente
        this._actualizar(); // Actualiza la lista de citas después de eliminar
      }
    }
  }
