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
  edicao$ = this.edicaoSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  editar(tarefa: Tarefa) {
    this.edicaoSource.next(tarefa);
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
    return this.httpClient.put<Tarefa>(`${this.API_TAREFAS}s${tarefa.id}`, tarefa)
  }

  excluir(tarefa: Tarefa): Observable<any> {
    return this.httpClient.delete(`${this.API_TAREFAS}/s${tarefa.id}`)
  }
}
