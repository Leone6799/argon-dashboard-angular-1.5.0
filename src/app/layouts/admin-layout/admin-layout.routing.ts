import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AgendaPacienteComponent } from '../../pages/agenda-paciente/agenda-paciente.component';
import { ConsultaDetalhesComponent } from '../../pages/consulta-detalhes/consulta-detalhes.component';

import { NutricionistaGuard } from '../../services/nutricionista.guard';
import { PacienteGuard } from '../../services/paciente.guard';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [NutricionistaGuard]
  },
  {
    path: 'consultas',
    component: TablesComponent,
    canActivate: [NutricionistaGuard]
  },
  {
    path: 'consulta/:id',
    component: ConsultaDetalhesComponent,
    canActivate: [NutricionistaGuard]
  },
  {
    path: 'agenda-paciente',
    component: AgendaPacienteComponent,
    canActivate: [PacienteGuard]
  },
  {
    path: 'perfil',
    component: UserProfileComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];