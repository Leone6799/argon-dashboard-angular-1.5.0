import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConsultaService, HorarioDisponivel, Consulta } from '../../services/consulta.service';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { Instance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'app-agenda-paciente',
  templateUrl: './agenda-paciente.component.html',
  styleUrls: ['./agenda-paciente.component.scss']
})
export class AgendaPacienteComponent implements OnInit, OnDestroy {
  @ViewChild('calendarioInput', { static: true }) calendarioInput!: ElementRef<HTMLInputElement>;

  dataSelecionada = '';
  datasDisponiveis: string[] = [];
  horarios: HorarioDisponivel[] = [];
  consultas: Consulta[] = [];
  mensagem = '';
  carregandoDatas = false;
  carregandoHorarios = false;

  private calendario?: Instance;

  constructor(
    private authService: AuthService,
    private consultaService: ConsultaService
  ) {}

  ngOnInit(): void {
    this.carregarDatasDisponiveis();
    this.carregarConsultas();
  }

  ngOnDestroy(): void {
    this.calendario?.destroy();
  }

  carregarDatasDisponiveis(): void {
    this.carregandoDatas = true;
    this.mensagem = '';

    this.consultaService.listarDatasDisponiveis().subscribe({
      next: (datas) => {
        this.datasDisponiveis = datas || [];
        this.carregandoDatas = false;
        this.iniciarCalendario();

        if (this.datasDisponiveis.length === 0) {
          this.mensagem = 'Nenhuma data disponível para agendamento.';
        }
      },
      error: () => {
        this.carregandoDatas = false;
        this.mensagem = 'Erro ao carregar datas disponíveis.';
      }
    });
  }

  iniciarCalendario(): void {
    this.calendario?.destroy();

    this.calendario = flatpickr(this.calendarioInput.nativeElement, {
      locale: Portuguese,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      minDate: 'today',
      enable: this.datasDisponiveis,
      allowInput: false,
      clickOpens: true,
      disableMobile: true,
      onChange: (_selectedDates, dateStr) => {
        this.dataSelecionada = dateStr;
        this.horarios = [];
        this.buscarHorarios();
      }
    });
  }

  abrirCalendario(): void {
    if (!this.calendario) {
      this.iniciarCalendario();
    }

    this.calendario?.open();
  }

  buscarHorarios(): void {
    if (!this.dataSelecionada) {
      this.mensagem = 'Selecione uma data disponível.';
      return;
    }

    this.carregandoHorarios = true;
    this.mensagem = '';

    this.consultaService.listarHorariosDisponiveis(this.dataSelecionada).subscribe({
      next: (horarios) => {
        this.horarios = horarios || [];
        this.carregandoHorarios = false;
        this.mensagem = this.horarios.length === 0
          ? 'Nenhum horário disponível para esta data.'
          : '';
      },
      error: () => {
        this.carregandoHorarios = false;
        this.mensagem = 'Erro ao buscar horários disponíveis.';
      }
    });
  }

  agendar(horario: HorarioDisponivel): void {
    const usuario = this.authService.getUsuarioLogado();

    if (!usuario) {
      this.mensagem = 'Usuário não encontrado. Faça login novamente.';
      return;
    }

    if (!horario.disponivel) {
      this.mensagem = 'Esse horário não está mais disponível.';
      return;
    }

    this.consultaService.agendarConsulta({
      pacienteId: usuario.id,
      horarioId: horario.id
    }).subscribe({
      next: () => {
        this.mensagem = 'Consulta solicitada com sucesso. Aguarde confirmação do nutricionista.';
        this.horarios = [];
        this.dataSelecionada = '';
        this.calendario?.clear();
        this.carregarDatasDisponiveis();
        this.carregarConsultas();
      },
      error: () => {
        this.mensagem = 'Erro ao agendar consulta. Verifique se o horário ainda está disponível.';
      }
    });
  }

  carregarConsultas(): void {
    const usuario = this.authService.getUsuarioLogado();

    if (!usuario) return;

    this.consultaService.listarConsultasPaciente(usuario.id).subscribe({
      next: (consultas) => {
        this.consultas = consultas || [];
      }
    });
  }
}
