import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';
import { EMPTY, catchError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalNotificacaoComponent } from 'src/app/components/modal-notificacao/modal-notificacao.component';

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
    private dialog: MatDialog
  ) { }

  editar(): void {
    this.service.editar(this.tarefa);
  }

  excluir(): void {
    // this.dialog.open(ConfirmacaoConclusaoComponent, {
    //   console.log('Tarefa concluída');
    // });
    // this.openDialog();
  }

  alterarStatus(): void {
    this.tarefa.concluida = !this.tarefa.concluida;
    this.tarefa.dataConclusao = this.tarefa.concluida ? new Date().getTime().toString() : '';
    this.service
      .atualizar(this.tarefa)
      .pipe(
        catchError(() => {
          this.dialog.open(ModalNotificacaoComponent, {
            data: { titulo:"Erro", mensagem: 'Não foi possivel concluir a tarefa' }
          });
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

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(ModalNotificacaoComponent, {
  //     data: { titulo:"Atenção", mensagem: 'Deseja realmente excluir a tarefa?' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }
}
