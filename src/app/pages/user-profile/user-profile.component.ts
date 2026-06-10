import { Component, OnInit } from '@angular/core';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  usuario: Usuario | null = null;
  fotoPerfil: string | null = null;
  mensagem = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado();
    this.fotoPerfil = localStorage.getItem('fotoPerfilAgendaFit');

    if (!this.usuario) {
      this.mensagem = 'Usuário não encontrado. Faça login novamente.';
    }
  }

  selecionarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const arquivo = input.files[0];

    if (!arquivo.type.startsWith('image/')) {
      this.mensagem = 'Selecione um arquivo de imagem válido.';
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      this.fotoPerfil = leitor.result as string;
      localStorage.setItem('fotoPerfilAgendaFit', this.fotoPerfil);
      this.mensagem = 'Foto de perfil atualizada com sucesso.';
    };

    leitor.readAsDataURL(arquivo);
  }

  removerFoto(): void {
    this.fotoPerfil = null;
    localStorage.removeItem('fotoPerfilAgendaFit');
    this.mensagem = 'Foto de perfil removida.';
  }

  formatarTelefone(telefone: string): string {
    const numeros = telefone.replace(/\D/g, '');

    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return telefone;
  }

  traduzirTipo(tipo: string): string {
    if (tipo === 'NUTRICIONISTA') {
      return 'Nutricionista';
    }

    return 'Paciente';
  }
}