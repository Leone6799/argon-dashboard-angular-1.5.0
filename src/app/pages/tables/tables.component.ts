import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService, Consulta } from '../../services/consulta.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {
  consultas: Consulta[] = [];

  consultasPendentes = 0;
  consultasConfirmadas = 0;
  consultasCanceladas = 0;
  consultasConcluidas = 0;

  mensagem = '';

  constructor(
    private consultaService: ConsultaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas(): void {
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
    this.consultasPendentes = this.consultas.filter(c => c.status === 'PENDENTE').length;
    this.consultasConfirmadas = this.consultas.filter(c => c.status === 'CONFIRMADA').length;
    this.consultasCanceladas = this.consultas.filter(c => c.status === 'CANCELADA').length;
    this.consultasConcluidas = this.consultas.filter(c => c.status === 'CONCLUIDA').length;
  }

  abrirDetalhes(id: number): void {
    this.router.navigate(['/app/consulta', id]);
  }

  confirmar(id: number): void {
    this.consultaService.confirmarConsulta(id).subscribe({
      next: () => this.carregarConsultas(),
      error: () => this.mensagem = 'Erro ao confirmar consulta.'
    });
  }

  cancelar(id: number): void {
    this.consultaService.cancelarConsulta(id).subscribe({
      next: () => this.carregarConsultas(),
      error: () => this.mensagem = 'Erro ao cancelar consulta.'
    });
  }

  concluir(id: number): void {
    this.consultaService.concluirConsulta(id).subscribe({
      next: () => this.carregarConsultas(),
      error: () => this.mensagem = 'Erro ao concluir consulta.'
    });
  }
}