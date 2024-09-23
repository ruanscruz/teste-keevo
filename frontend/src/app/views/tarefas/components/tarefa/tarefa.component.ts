import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';
import { FuncoesHelpers } from 'src/app/helpers/funcoes';
import { STATUS_ANDAMENTO, STATUS_CONCLUIDA } from 'src/app/constants/status-tarefa';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
  @Input() tarefa!: Tarefa;
  statusConcluido = STATUS_CONCLUIDA;

  constructor(
    private service: TarefasService,
    private router: Router,
    private route: ActivatedRoute,
    private helper: FuncoesHelpers
  ) { }

  editarTarefa(): void {
    this.service.editar(this.tarefa);
  }

  excluirtarefa(): void {
    this.helper
      .confirmarAcao("Excluir", "Deseja realmente excluir a tarefa?")
      .afterClosed().subscribe(result => {
        if (result) this.excluir();
      })
  }

  excluir(): void {
    this.service.excluir(this.tarefa).subscribe({
      next: () => this.atualizarDadosTarefas(),
      error: () => this.helper.notificar("Erro", "Não foi possivel excluir a tarefa")
    })
  }

  alterarStatus(): void {
    this.tarefa.status = this.tarefa.status === STATUS_ANDAMENTO
      ? STATUS_CONCLUIDA
      : STATUS_ANDAMENTO;
    this.tarefa.dataConclusao = this.tarefa.status === STATUS_CONCLUIDA ? new Date().getTime().toString() : '';
    this.service.atualizar(this.tarefa).subscribe({
      next: () => this.atualizarDadosTarefas(),
      error: () => {
        this.helper.notificar("Erro", "Não foi possivel alterar o status da tarefa");
        this.tarefa.status = this.tarefa.status === STATUS_ANDAMENTO
          ? STATUS_CONCLUIDA
          : STATUS_ANDAMENTO;
        this.tarefa.dataConclusao = this.tarefa.status === STATUS_CONCLUIDA ? new Date().getTime().toString() : '';
      }
    })
  }

  atualizarDadosTarefas() {
    this.router.navigate(['/tarefas', this.route.snapshot.url[1].path])
  }
}
