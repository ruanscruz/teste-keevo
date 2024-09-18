import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefasComponent } from './views/tarefas/tarefas.component';

const routes: Routes = [
  {
    path: 'tarefa/:status',
    component: TarefasComponent
  },
  {
    path: '',
    redirectTo: 'tarefa/criadas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
