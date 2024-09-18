import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
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

  constructor(
    private service: TarefasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.handleStatusInicial();
    this.handleStatusAlterado();
    this.handleValoresIniciais();
  }

  handleStatusInicial(): void {
    const status = this.route.snapshot.paramMap.get('status')?.toString();
    this.statusTarefas = status || 'criadas';
    this.buscarTarefas(this.statusTarefas);
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

  handleValoresIniciais(): void {
    this.resumoQuantidadeTarefas = {
      criadas: 0,
      andamento: 0,
      concluidas: 0
    };
    this.listaTarefas = [];
  }


  buscarTarefas(status: string = 'criadas'): void {
    this.service.buscar().subscribe(response => {
      this.handleValoresIniciais();
      Object.values(response).forEach(tarefa => {
        const { concluida } = tarefa;
        this.resumoQuantidadeTarefas['criadas']++;
        concluida
          ? this.resumoQuantidadeTarefas['concluidas']++
          : this.resumoQuantidadeTarefas['andamento']++;

        const tarefaStatusMap: { [key: string]: boolean } = {
          'criadas': true,
          'andamento': !concluida,
          'concluidas': concluida
        };

        if (tarefaStatusMap[status]) {
          this.listaTarefas.push(tarefa);
        }
        this.listaTarefas.sort((a, b) => a.dataCriacao > b.dataCriacao ? -1 : 1 )
      });
    });
  }
}
