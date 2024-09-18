import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.component.html',
  styleUrls: ['./lista-tarefa.component.css']
})
export class ListaTarefaComponent {
  @Input() listaTarefas: any[] = [];
}
