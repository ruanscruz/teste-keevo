import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tarefa } from '../interfaces/tarefa';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private readonly API_TAREFAS = `${environment.api}/tarefa`;
  private edicaoSource = new Subject<Tarefa>();
  edicao$ = this.edicaoSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  editar(tarefa: Tarefa) {
    this.edicaoSource.next(tarefa);
  }

  buscar(): Observable<Tarefa[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return this.httpClient.get<Tarefa[]>(this.API_TAREFAS, { headers });
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

  excluir(tarefa: Tarefa): Observable<any> {
    return this.httpClient.delete(`${this.API_TAREFAS}/${tarefa.id}`)
  }

  filtrar(status: string): Observable<Tarefa[]> {
    let params = new HttpParams();
    if (status === 'andamento') {
      params = params.append('concluida', 'false');
    } else if (status === 'concluidas') {
      params = params.append('concluida', 'true');
    }

    return this.httpClient.get<Tarefa[]>(this.API_TAREFAS, { params });
  }
}
