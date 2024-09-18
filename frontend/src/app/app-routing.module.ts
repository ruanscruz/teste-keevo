import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefasComponent } from './views/tarefas/tarefas.component';

const routes: Routes = [
  {
    path: 'tarefas/:status',
    component: TarefasComponent
  },
  {
    path: '',
    redirectTo: 'tarefas/criadas',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tarefas/criadas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
