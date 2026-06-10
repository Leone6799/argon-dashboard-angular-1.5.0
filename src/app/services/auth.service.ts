import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  tipo: 'PACIENTE' | 'NUTRICIONISTA';
}

interface LoginRequest {
  email: string;
  senha: string;
}

interface CadastroRequest {
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private storageKey = 'usuarioLogado';

  constructor(private http: HttpClient) {}

  login(dados: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, dados);
  }

  cadastrar(dados: CadastroRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/cadastro`, dados);
  }

  salvarUsuario(usuario: Usuario): void {
    localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  getUsuarioLogado(): Usuario | null {
    const usuario = localStorage.getItem(this.storageKey);

    if (!usuario) {
      return null;
    }

    return JSON.parse(usuario);
  }

  isLogado(): boolean {
    return this.getUsuarioLogado() !== null;
  }

  isNutricionista(): boolean {
    const usuario = this.getUsuarioLogado();
    return usuario?.tipo === 'NUTRICIONISTA';
  }

  isPaciente(): boolean {
    const usuario = this.getUsuarioLogado();
    return usuario?.tipo === 'PACIENTE';
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}