import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  consultas: Consulta[] = [];

  pendentes = 0;
  confirmadas = 0;
  canceladas = 0;
  concluidas = 0;

  mensagem = '';

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas(): void {
    this.mensagem = '';

    this.consultaService.listarConsultasAdmin().subscribe({
      next: (consultas) => {
        this.consultas = consultas;
        this.atualizarResumo();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar consultas.';
      }
    });
  }

  atualizarResumo(): void {
    this.pendentes = this.consultas.filter(c => c.status === 'PENDENTE').length;
    this.confirmadas = this.consultas.filter(c => c.status === 'CONFIRMADA').length;
    this.canceladas = this.consultas.filter(c => c.status === 'CANCELADA').length;
    this.concluidas = this.consultas.filter(c => c.status === 'CONCLUIDA').length;
  }

  confirmar(id: number): void {
    this.consultaService.confirmarConsulta(id).subscribe({
      next: () => this.carregarConsultas(),
      error: () => this.mensagem = 'Erro ao confirmar consulta.'
    });
  }

  cancelar(id: number): void {
    const confirmou = confirm('Tem certeza que deseja cancelar esta consulta?');

    if (!confirmou) {
      return;
    }

    this.consultaService.cancelarConsulta(id).subscribe({
      next: () => this.carregarConsultas(),
      error: () => this.mensagem = 'Erro ao cancelar consulta.'
    });
  }
}
