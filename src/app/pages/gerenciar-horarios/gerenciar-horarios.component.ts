import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { HorarioDisponivel } from '../../models/horario-disponivel';

@Component({
  selector: 'app-gerenciar-horarios',
  templateUrl: './gerenciar-horarios.component.html'
})
export class GerenciarHorariosComponent implements OnInit {
  horarios: HorarioDisponivel[] = [];
  novaData: string = '';
  novoHorario: string = '';

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.carregarHorarios();
  }

  carregarHorarios(): void {
    this.consultaService.listarTodosHorarios().subscribe({
      next: (res) => this.horarios = res,
      error: (err) => console.error('Erro ao carregar horários', err)
    });
  }

  adicionar(): void {
    if (!this.novaData || !this.novoHorario) {
      alert('Preencha a data e o horário!');
      return;
    }

    const payload = {
      data: this.novaData,
      horario: this.novoHorario + ':00', // O SpringBoot precisa dos segundos (HH:mm:ss)
      disponivel: true
    };

    this.consultaService.adicionarHorario(payload).subscribe({
      next: () => {
        alert('Horário disponibilizado com sucesso!');
        this.carregarHorarios();
        this.novaData = '';
        this.novoHorario = '';
      },
      error: () => alert('Erro ao adicionar horário.')
    });
  }

  remover(id: number): void {
    if (confirm('Tem certeza que deseja remover este horário da agenda?')) {
      this.consultaService.removerHorario(id).subscribe({
        next: () => {
          alert('Horário removido!');
          this.carregarHorarios();
        },
        error: () => alert('Erro! Não é possível remover um horário que já possui consulta agendada.')
      });
    }
  }
}