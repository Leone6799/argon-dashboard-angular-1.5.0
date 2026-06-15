import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta';
import { Router } from '@angular/router';

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

  constructor(private consultaService: ConsultaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarConsultas();
  }

  irParaHorarios(): void {
  // Agora vai direto para a rota verdadeira, sem bater na parede e voltar
  this.router.navigate(['/app/gerenciar-horarios']);
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
    next: () => {
      alert('Consulta confirmada com sucesso e notificação enviada!'); // A caixinha de feedback
      this.carregarConsultas();
    },
    error: (err) => {
      console.error(err);
      alert('Erro ao confirmar consulta. Verifique se o serviço de WhatsApp está ativo.');
    }
  });
}

cancelar(id: number): void {
  const confirmou = confirm('Tem certeza que deseja cancelar esta consulta?');
  if (confirmou) {
    this.consultaService.cancelarConsulta(id).subscribe({
      next: () => {
        alert('Consulta cancelada com sucesso!'); // Feedback visual de cancelamento
        this.carregarConsultas();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cancelar consulta. Verifique os logs do servidor.');
      }
    });
  }
}
}