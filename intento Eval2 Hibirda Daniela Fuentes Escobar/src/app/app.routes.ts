import { Routes } from '@angular/router';
import { GestionCitasPage } from './Paginas/gestion-citas/gestion-citas.page';
import { ConfiguracionPage } from './Paginas/configuracion/configuracion.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./Paginas/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'gestion-citas',
    loadComponent: () => import('./Paginas/gestion-citas/gestion-citas.page').then( m => m.GestionCitasPage)
  },
];
