import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonHeader, IonTitle, IonToolbar, IonToggle, IonLabel, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { GestionCitasService } from 'src/app/Servicios/gestion-citas.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonContent, IonItem, IonHeader, IonTitle, IonButtons, IonLabel, IonToolbar, CommonModule, IonToggle, FormsModule]
})
export class ConfiguracionPage implements OnInit {
    permitirBorrarCita: boolean = false;  // Variable para manejar el estado del toggle
  
    constructor(
      private citaService: GestionCitasService // Inyectamos el servicio
    ) { }
  
    async ngOnInit(): Promise<void> {
      // Al iniciar, comprobamos si el toggle está activado (es decir, si debe mostrarse o no la cita aleatoria)
      this.permitirBorrarCita = await this.citaService.obtenerConfiguracion();  // Cargamos la configuración desde Preferences
    }
  
    // Método para manejar el cambio en el toggle
    async toggleEliminarCita(): Promise<void> {
      // Al cambiar el toggle, actualizamos el estado en el servicio y lo guardamos en Preferences
      await this.citaService.guardarConfiguracion(this.permitirBorrarCita);  // Guardamos la configuración en Preferences
    }
  }
