import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';
import { EMPTY, catchError } from 'rxjs';
import { FuncoesHelpers } from 'src/app/helpers/funcoes';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
  @Input() tarefa!: Tarefa;

  constructor(
    private service: TarefasService,
    private router: Router,
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
      });
  }

  excluir(): void {
    this.service
      .excluir(this.tarefa)
      .pipe(
        catchError(() => {
          this.helper.notificar("Erro", "Não foi possivel excluir a tarefa");
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/tarefas/criadas']);
      });
  }

  alterarStatus(): void {
    this.tarefa.concluida = !this.tarefa.concluida;
    this.tarefa.dataConclusao = this.tarefa.concluida ? new Date().getTime().toString() : '';
    this.service
      .atualizar(this.tarefa)
      .pipe(
        catchError(() => {
          this.helper.notificar("Erro", "Não foi possivel alterar o status da tarefa");
          this.tarefa.concluida = !this.tarefa.concluida;
          this.tarefa.dataConclusao = this.tarefa.concluida ? new Date().getTime().toString() : '';
          return EMPTY;
        })
      )
      .subscribe(tarefa => {
        const rota: string = tarefa.concluida ? 'concluidas' : 'andamento';
        this.router.navigate(['/tarefas', rota]);
      })
  }
}
