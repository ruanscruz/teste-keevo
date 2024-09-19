import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
  @Input() tarefa!: Tarefa;
  tarefaSubscribe!: Subscription;

  constructor(private service: TarefasService) {}

  editar(): void {
    this.service.editar(this.tarefa);
  }
}
