import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-redirect',
  template: ''
})
export class HomeRedirectComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioLogado();

    if (!usuario) {
      this.router.navigate(['/auth/login']);
      return;
    }

    if (usuario.tipo === 'NUTRICIONISTA') {
      this.router.navigate(['/app/dashboard']);
      return;
    }

    this.router.navigate(['/app/agenda-paciente']);
  }
}