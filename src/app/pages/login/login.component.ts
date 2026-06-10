import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';
  mensagem = '';
  carregando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioLogado();

    if (!usuario) {
      return;
    }

    if (usuario.tipo === 'NUTRICIONISTA') {
      this.router.navigate(['/app/dashboard']);
    } else {
      this.router.navigate(['/app/agenda-paciente']);
    }
  }

  entrar(): void {
    if (!this.email || !this.senha) {
      this.mensagem = 'Preencha e-mail e senha.';
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    this.authService.login({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (usuario: Usuario) => {
        this.authService.salvarUsuario(usuario);

        if (usuario.tipo === 'NUTRICIONISTA') {
          this.router.navigate(['/app/dashboard']);
        } else {
          this.router.navigate(['/app/agenda-paciente']);
        }
      },
      error: () => {
        this.mensagem = 'E-mail ou senha inválidos.';
        this.carregando = false;
      }
    });
  }
}