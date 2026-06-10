import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus = false;

  constructor(
    public location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getTitle(): string {
    const path = this.location.path();

    if (path.includes('/app/dashboard')) {
      return 'Painel do Nutricionista';
    }

    if (path.includes('/app/consultas')) {
      return 'Consultas Recebidas';
    }

    if (path.includes('/app/consulta')) {
      return 'Detalhes da Consulta';
    }

    if (path.includes('/app/agenda-paciente')) {
      return 'Agendar Consulta';
    }

    if (path.includes('/app/perfil')) {
      return 'Perfil';
    }

    return 'AgendaFit';
  }

  isNutricionista(): boolean {
    return this.authService.isNutricionista();
  }

  isPaciente(): boolean {
    return this.authService.isPaciente();
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}