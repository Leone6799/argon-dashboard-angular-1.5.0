import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  nome = '';
  dataNascimento = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';
  mensagem = '';
  carregando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar(): void {
    if (
      !this.nome ||
      !this.dataNascimento ||
      !this.email ||
      !this.telefone ||
      !this.senha ||
      !this.confirmarSenha
    ) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    const idade = this.calcularIdade(this.dataNascimento);

    if (idade < 0 || idade > 120) {
      this.mensagem = 'Informe uma data de nascimento válida.';
      return;
    }

    const telefoneSomenteNumeros = this.limparTelefone(this.telefone);

    if (telefoneSomenteNumeros.length < 10 || telefoneSomenteNumeros.length > 11) {
      this.mensagem = 'Informe um telefone válido com DDD.';
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    this.authService.cadastrar({
      nome: this.nome,
      idade: idade,
      email: this.email,
      telefone: telefoneSomenteNumeros,
      senha: this.senha
    }).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.mensagem = 'Erro ao cadastrar. Verifique se o e-mail já está em uso.';
        this.carregando = false;
      }
    });
  }

  aplicarMascaraTelefone(): void {
    let valor = this.telefone.replace(/\D/g, '');

    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    if (valor.length <= 10) {
      this.telefone = valor.replace(
        /(\d{0,2})(\d{0,4})(\d{0,4})/,
        (_match, ddd, parte1, parte2) => {
          let resultado = '';

          if (ddd) {
            resultado += `(${ddd}`;
          }

          if (ddd.length === 2) {
            resultado += ') ';
          }

          if (parte1) {
            resultado += parte1;
          }

          if (parte2) {
            resultado += `-${parte2}`;
          }

          return resultado;
        }
      );
    } else {
      this.telefone = valor.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3'
      );
    }
  }

  limparTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  calcularIdade(dataNascimento: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  }
}