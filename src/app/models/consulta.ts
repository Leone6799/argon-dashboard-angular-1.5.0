import { Usuario } from './usuario';

export interface Consulta {
  id: number;
  paciente: Usuario;
  nutricionista: Usuario;
  data: string;
  horario: string;
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA' | 'CONCLUIDA';
}