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

export interface HorarioDisponivel {
  id: number;
  data: string;
  horario: string;
  disponivel: boolean;
  nutricionista: Usuario;
}

export interface Consulta {
  id: number;
  data: string;
  horario: string;
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA' | 'CONCLUIDA';
  paciente: Usuario;
  nutricionista: Usuario;
  horarioDisponivel: HorarioDisponivel;
}

interface AgendamentoRequest {
  pacienteId: number;
  horarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarHorariosDisponiveis(data: string): Observable<HorarioDisponivel[]> {
    return this.http.get<HorarioDisponivel[]>(`${this.apiUrl}/horarios/disponiveis?data=${data}`);
  }

  agendarConsulta(dados: AgendamentoRequest): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/consultas/agendar`, dados);
  }

  listarConsultasPaciente(pacienteId: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/consultas/paciente/${pacienteId}`);
  }

  listarConsultasAdmin(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/consultas/admin`);
  }

  buscarConsultaPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/consultas/${id}`);
  }

  confirmarConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/consultas/${id}/confirmar`, {});
  }

  cancelarConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/consultas/${id}/cancelar`, {});
  }

  concluirConsulta(id: number): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/consultas/${id}/concluir`, {});
  }

  listarDatasDisponiveis(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/horarios/datas-disponiveis`);
}
}