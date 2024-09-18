import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tarefa } from '../interfaces/tarefa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private readonly API_TAREFAS = `${environment.api}/tarefas`;
  constructor(private httpClient: HttpClient) {
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
}
