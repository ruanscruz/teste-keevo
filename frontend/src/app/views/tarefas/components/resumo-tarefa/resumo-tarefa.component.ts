import { Component, Input } from '@angular/core';
import { ResumoTarefa } from 'src/app/interfaces/resumo-tarefa';

@Component({
  selector: 'app-resumo-tarefa',
  templateUrl: './resumo-tarefa.component.html',
  styleUrls: ['./resumo-tarefa.component.css']
})
export class ResumoTarefaComponent {
  @Input() resumoQuantidadeTarefas!: ResumoTarefa;
}
