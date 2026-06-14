import { Usuario } from './usuario';
import { HorarioDisponivel } from './horario-disponivel';

export interface Consulta {
  id?: number;
  paciente?: Usuario;           // Garante que o Angular reconheça o objeto paciente
  nutricionista?: Usuario;
  horario?: HorarioDisponivel;  // Garante que o Angular reconheça o objeto horario
  status: string;
}