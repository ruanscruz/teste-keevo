import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

const PAUSA_DIGITACAO = 300;

@Component({
  selector: 'app-filtro-tarefa',
  templateUrl: './filtro-tarefa.component.html',
  styleUrls: ['./filtro-tarefa.component.css']
})
export class FiltroTarefaComponent {
  campoBusca = new FormControl();
  @Output() aoFiltrar = new EventEmitter<string>();

  constructor() {
    this.campoBusca.valueChanges.pipe(
      debounceTime(PAUSA_DIGITACAO),
    ).subscribe(busca => this.aoFiltrar.emit(busca));
  }
}
