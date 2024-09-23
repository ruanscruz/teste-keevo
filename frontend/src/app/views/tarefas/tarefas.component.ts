import { STATUS_CONCLUIDA } from './../../constants/status-tarefa';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { FuncoesHelpers } from 'src/app/helpers/funcoes';
import { ResumoTarefa } from 'src/app/interfaces/resumo-tarefa';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  statusTarefas!: string;
  listaTarefas!: Tarefa[];
  resumoQuantidadeTarefas!: ResumoTarefa;
  filtroAtivo: boolean = false;
  haMaisTarefas: boolean = true;

  constructor(
    private service: TarefasService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: FuncoesHelpers
  ) { }

  ngOnInit() {
    this.handleStatusInicial();
    this.handleStatusAlterado();
    this.handleValoresIniciais();
  }

  buscarTarefas(status: string = ''): void {
    this.service.buscar('criadas').subscribe({
      next: tarefas => {
        this.handleValoresIniciais();
        this.handleTarefas(tarefas, status);
      },
      error: () => this.helper.notificar("Erro", "Não foi possivel buscar as tarefas")
    });
  }

  listarTarefas(valor: string): void {
    if (this.resumoQuantidadeTarefas[this.statusTarefas] === 0) return;

    this.filtroAtivo = valor !== '';
    this.service.filtrar(this.statusTarefas).subscribe({
      next: tarefas => {
        this.listaTarefas = tarefas.filter(tarefa => tarefa.descricao.toLowerCase().includes(valor.toLowerCase()))
      },
      error: () => this.helper.notificar("Erro", "Não foi possivel buscar as tarefas")
    })
  }

  handleTarefas(tarefas: Tarefa[], status: string): void {
    Object.values(tarefas).forEach(tarefa => {
      const tarefaConcluida = tarefa.status === STATUS_CONCLUIDA;
      this.resumoQuantidadeTarefas['criadas']++;

      tarefaConcluida
        ? this.resumoQuantidadeTarefas['concluida']++
        : this.resumoQuantidadeTarefas['andamento']++;

      const tarefaStatusMap: { [key: string]: boolean } = {
        'criadas': true,
        'andamento': !tarefaConcluida,
        'concluida': tarefaConcluida
      };

      if (tarefaStatusMap[status]) {
        this.listaTarefas.push(tarefa);
      }
      this.listaTarefas.sort((a, b) => a.dataCriacao > b.dataCriacao ? -1 : 1)
    });
  }

  handleStatusInicial(): void {
    const status = this.route.snapshot.paramMap.get('status')?.toString();
    this.statusTarefas = status || 'criadas';
    this.buscarTarefas(this.statusTarefas);
  }

  handleValoresIniciais(): void {
    this.resumoQuantidadeTarefas = {
      criadas: 0,
      andamento: 0,
      concluida: 0
    };
    this.listaTarefas = [];
  }

  handleStatusAlterado(): void {
    this.router.events
      .pipe(
        distinctUntilChanged(),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const status = this.route.snapshot.paramMap.get('status')?.toString();
        this.statusTarefas = status || this.statusTarefas
        this.buscarTarefas(this.statusTarefas);
      });
  }
}
