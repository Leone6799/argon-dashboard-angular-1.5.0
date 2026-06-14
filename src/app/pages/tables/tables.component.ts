import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  public consultas: Consulta[] = [];

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas(): void {
    this.consultaService.getConsultas().subscribe(
      (data: Consulta[]) => {
        this.consultas = data;
      },
      (error: any) => {
        console.error('Erro ao procurar a listagem de consultas:', error);
      }
    );
  }


  abrirConversaWhatsApp(telefone?: string, nomePaciente?: string): void {
    if (!telefone) {
      alert('Este paciente não possui número de telefone registado no sistema.');
      return;
    }

    // Limpa parênteses, traços e espaços, deixando apenas números
    let numeroTratado = telefone.replace(/\D/g, '');

    // Se o número tiver 10 ou 11 dígitos, insere o DDI 55
    if (numeroTratado.length === 10 || numeroTratado.length === 11) {
      numeroTratado = '55' + numeroTratado;
    }

    const nome = nomePaciente ? nomePaciente : 'Paciente';
    const textoMensagem = encodeURIComponent(`Olá, ${nome}! Aqui é o seu Nutricionista. Entro em contacto para combinarmos os detalhes da nossa consulta.`);
    const urlFinal = `https://wa.me/${numeroTratado}?text=${textoMensagem}`;

    window.open(urlFinal, '_blank');
  }
}