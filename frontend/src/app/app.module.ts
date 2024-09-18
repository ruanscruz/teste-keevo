import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { TarefasComponent } from './views/tarefas/tarefas.component';
import { CadastroTarefaComponent } from './views/tarefas/components/cadastro-tarefa/cadastro-tarefa.component';
import { FiltroTarefaComponent } from './views/tarefas/components/filtro-tarefa/filtro-tarefa.component';
import { ListaTarefaComponent } from './views/tarefas/components/lista-tarefa/lista-tarefa.component';
import { ResumoTarefaComponent } from './views/tarefas/components/resumo-tarefa/resumo-tarefa.component';
import { TarefaComponent } from './views/tarefas/components/tarefa/tarefa.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    TarefasComponent,
    CadastroTarefaComponent,
    FiltroTarefaComponent,
    ListaTarefaComponent,
    ResumoTarefaComponent,
    TarefaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
