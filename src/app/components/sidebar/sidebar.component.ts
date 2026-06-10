import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

const ROTAS_NUTRICIONISTA: RouteInfo[] = [
  {
    path: '/app/dashboard',
    title: 'Painel do Nutricionista',
    icon: 'ni-tv-2 text-primary',
    class: ''
  },
  {
    path: '/app/consultas',
    title: 'Consultas Recebidas',
    icon: 'ni-calendar-grid-58 text-success',
    class: ''
  },
  {
    path: '/app/perfil',
    title: 'Perfil',
    icon: 'ni-single-02 text-yellow',
    class: ''
  }
];

const ROTAS_PACIENTE: RouteInfo[] = [
  {
    path: '/app/agenda-paciente',
    title: 'Agendar Consulta',
    icon: 'ni-watch-time text-info',
    class: ''
  },
  {
    path: '/app/perfil',
    title: 'Perfil',
    icon: 'ni-single-02 text-yellow',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[] = [];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isNutricionista()) {
      this.menuItems = ROTAS_NUTRICIONISTA;
    } else {
      this.menuItems = ROTAS_PACIENTE;
    }

    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}