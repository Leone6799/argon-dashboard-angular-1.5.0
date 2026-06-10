export interface Usuario {
  id: number;
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  tipo: 'PACIENTE' | 'NUTRICIONISTA';
}