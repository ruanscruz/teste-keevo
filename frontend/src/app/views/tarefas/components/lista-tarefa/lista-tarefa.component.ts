import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/interfaces/tarefa';

@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.component.html',
  styleUrls: ['./lista-tarefa.component.css']
})
export class ListaTarefaComponent {
  @Input() listaTarefas!: Tarefa[];
  @Input() statusTarefas!: string;
  @Input() filtroAtivo!: boolean;
}
