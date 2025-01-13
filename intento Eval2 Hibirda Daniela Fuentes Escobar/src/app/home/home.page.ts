import { Component, OnInit } from '@angular/core';
import { IonFab, IonCard, IonFabButton, IonIcon, IonHeader, IonToolbar, IonContent, IonTitle, IonButton, IonButtons, IonCardTitle, IonCardSubtitle, IonCardHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Cita } from '../Modelo/Cita';
import { GestionCitasService } from '../Servicios/gestion-citas.service';
import { add } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { RouterModule, Router } from '@angular/router';
import { AleatoriaComponent } from '../Componentes/aleatoria/aleatoria.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [AleatoriaComponent, IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, CommonModule, IonButtons, RouterModule, IonButton, IonTitle, IonContent, IonToolbar, IonHeader, IonFab, IonFabButton, IonIcon],
})
export class HomePage implements OnInit {
  citaAleatoria: Cita | null = null;  
  permitirBorrarCita: boolean = false;  

  constructor(private citaService: GestionCitasService, private router: Router) {
    addIcons({
      add,
      settingsOutline,
    });
  }

  async ngOnInit(): Promise<void> {
    // Verificar si se permite mostrar la cita aleatoria
    this.permitirBorrarCita = await this.citaService.obtenerConfiguracion();

    // Si no está permitido, obtener la cita aleatoria
    if (this.permitirBorrarCita) {
      this.citaAleatoria = await this.citaService.obtenerCitaAleatoria();
      console.log(this.citaAleatoria);  // Verifica que la cita se muestra en consola
    }
  }

  // Método para navegar a la configuración
  goToConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
}
