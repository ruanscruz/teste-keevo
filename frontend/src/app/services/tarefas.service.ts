import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tarefa } from '../interfaces/tarefa';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private readonly API_TAREFAS = `${environment.api}/tarefas`;
  private edicaoSource = new Subject<Tarefa>();
  private conclusaoSource = new Subject<Tarefa>();

  constructor(private httpClient: HttpClient) {
  }

  edicao$ = this.edicaoSource.asObservable();
  conclusao$ = this.conclusaoSource.asObservable();

  editar(tarefa: Tarefa) {
    this.edicaoSource.next(tarefa);
  }

  concluir(tarefa: Tarefa) {
    this.conclusaoSource.next(tarefa);
  }

  buscar(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.API_TAREFAS);
  }

  cadastrar(descricao: string): Observable<Tarefa> {
    const tarefa = {
      descricao,
      dataCriacao: new Date().getTime().toString(),
      dataConclusao: '',
      concluida: false
    }
    return this.httpClient.post<Tarefa>(`${this.API_TAREFAS}`, tarefa)
  }

  atualizar(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.put<Tarefa>(`${this.API_TAREFAS}/${tarefa.id}`, tarefa)
  }
}
