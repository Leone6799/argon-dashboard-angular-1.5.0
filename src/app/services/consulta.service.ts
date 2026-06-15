import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { HorarioDisponivel } from '../models/horario-disponivel';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private apiUrl = 'http://localhost:8080/consultas';
  private horarioUrl = 'http://localhost:8080/api/horarios';

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

  // O Angular envia um objeto { pacienteId, horarioId }, então usamos "any" ou uma interface DTO aqui
  agendarConsulta(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agendar`, dados);
}

  // ==========================================
  // MÉTODOS PARA A TELA DE DASHBOARD (ADMIN/NUTRICIONISTA)
  // ==========================================

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  listarConsultasAdmin(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  buscarConsultaPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  // ==========================================
  // MÉTODOS DE GERENCIAMENTO DE STATUS
  // ==========================================

  confirmarConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/status`, { status: 'CONFIRMADA' });
  }

  cancelarConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/status`, { status: 'CANCELADA' });
  }

  concluirConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/status`, { status: 'CONCLUIDA' });
  }

  atualizarStatus(id: number, status: string): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}/status`, { status });
  }
}