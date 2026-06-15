import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { HorarioDisponivel } from '../models/horario-disponivel';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  // CORREÇÃO 1: Removido o "/api" das URLs para bater com o Java
  private apiUrl = 'http://localhost:8080/consultas';
  private horarioUrl = 'http://localhost:8080/horarios';

  constructor(private http: HttpClient) { }

  // ==========================================
  // MÉTODOS PARA A TELA DE AGENDAMENTO (PACIENTE)
  // ==========================================
  
  listarDatasDisponiveis(): Observable<string[]> {
    return this.http.get<string[]>(`${this.horarioUrl}/datas-disponiveis`);
  }

  listarHorariosDisponiveis(data: string): Observable<HorarioDisponivel[]> {
    return this.http.get<HorarioDisponivel[]>(`${this.horarioUrl}/disponiveis?data=${data}`);
  }

  listarConsultasPaciente(pacienteId: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }

  agendarConsulta(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agendar`, dados);
  }

  // ==========================================
  // MÉTODOS PARA A TELA DE DASHBOARD (ADMIN/NUTRICIONISTA)
  // ==========================================

  getConsultas(): Observable<Consulta[]> {
    // CORREÇÃO 2: Adicionado o /admin no final da URL
    return this.http.get<Consulta[]>(`${this.apiUrl}/admin`);
  }

  listarConsultasAdmin(): Observable<Consulta[]> {
    // CORREÇÃO 2: Adicionado o /admin no final da URL
    return this.http.get<Consulta[]>(`${this.apiUrl}/admin`);
  }

  buscarConsultaPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  // ==========================================
  // MÉTODOS DE GERENCIAMENTO DE STATUS
  // ==========================================

  // CORREÇÃO 3: Ajustado os caminhos para /confirmar, /cancelar e /concluir como o Java espera
  confirmarConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/confirmar`, {});
  }

  cancelarConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  concluirConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/concluir`, {});
  }

}