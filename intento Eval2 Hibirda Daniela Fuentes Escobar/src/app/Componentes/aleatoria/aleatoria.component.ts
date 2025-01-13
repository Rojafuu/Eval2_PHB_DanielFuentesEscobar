import { Component, Input } from '@angular/core';
import { Cita } from 'src/app/Modelo/Cita';
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader } from '@ionic/angular/standalone';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-aleatoria',
  templateUrl: './aleatoria.component.html',
  styleUrls: ['./aleatoria.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader],

})

export class AleatoriaComponent {
  @Input() citaAleatoria: Cita | null = null; // Recibe la cita aleatoria desde el componente padre
}
