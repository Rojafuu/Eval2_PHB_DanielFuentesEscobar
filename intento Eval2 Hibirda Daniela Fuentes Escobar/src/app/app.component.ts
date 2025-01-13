import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, settingsOutline,trashOutline } from 'ionicons/icons'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  constructor() {
    addIcons({
      add,
      settingsOutline,
      trashOutline
    });
  }
}
