import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta';

@Component({
  selector: 'app-consulta-detalhes',
  templateUrl: './consulta-detalhes.component.html',
  styleUrls: ['./consulta-detalhes.component.scss']
})
export class ConsultaDetalhesComponent implements OnInit {
  consulta: Consulta | null = null;
  mensagem = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultaService: ConsultaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.consultaService.buscarConsultaPorId(id).subscribe({
      next: (consulta) => {
        this.consulta = consulta;
      },
      error: () => {
        this.mensagem = 'Consulta não encontrada.';
      }
    });
  }

  confirmar(): void {
    if (!this.consulta) return;

    this.consultaService.confirmarConsulta(this.consulta.id).subscribe({
      next: (consulta) => this.consulta = consulta
    });
  }

  cancelar(): void {
    if (!this.consulta) return;

    this.consultaService.cancelarConsulta(this.consulta.id).subscribe({
      next: (consulta) => this.consulta = consulta
    });
  }

  concluir(): void {
    if (!this.consulta) return;

    this.consultaService.concluirConsulta(this.consulta.id).subscribe({
      next: (consulta) => this.consulta = consulta
    });
  }

  voltar(): void {
    this.router.navigate(['/admin/consultas']);
  }
}