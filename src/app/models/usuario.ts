export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string; // Adicionado para a integração com o WhatsApp
  tipoUsuario: 'PACIENTE' | 'NUTRICIONISTA' | 'ADMIN';
}