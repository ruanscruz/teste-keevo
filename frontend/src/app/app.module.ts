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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusTarefaPipe } from './pipes/status-tarefa.pipe';
import { ModalNotificacaoComponent } from './components/modal-notificacao/modal-notificacao.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';

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
    TarefaComponent,
    StatusTarefaPipe,
    ModalNotificacaoComponent,
    ModalConfirmacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
