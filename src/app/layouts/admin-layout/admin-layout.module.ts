import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AgendaPacienteComponent } from '../../pages/agenda-paciente/agenda-paciente.component';
import { ConsultaDetalhesComponent } from '../../pages/consulta-detalhes/consulta-detalhes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GerenciarHorariosComponent } from 'src/app/pages/gerenciar-horarios/gerenciar-horarios.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    AgendaPacienteComponent,
    ConsultaDetalhesComponent,
    GerenciarHorariosComponent
  ]
})

export class AdminLayoutModule {}
