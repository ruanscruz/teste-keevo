import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuncoesHelpers } from 'src/app/helpers/funcoes';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrls: ['./cadastro-tarefa.component.css']
})
export class CadastroTarefaComponent implements OnInit {
  formulario!: FormGroup;
  subscription!: Subscription
  tarefaEdicao!: Tarefa;
  edicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: TarefasService,
    private router: Router,
    private helper: FuncoesHelpers
  ) {
    this.subscription = this.service.edicao$.subscribe({
      next: (tarefa: Tarefa) => {
        this.formulario.setValue({ descricao: tarefa.descricao })
        this.tarefaEdicao = tarefa
        this.edicao = true
        document.getElementById('descricao')?.focus()
      }
    })
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      descricao: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])]
    })
  }

  salvarTarefa(): void {
    if (this.formulario.valid) {
      !this.edicao ? this.cadastrarTarefa() : this.editartarefa()
      this.formulario.reset()
      document.getElementById('descricao')?.focus()
    }
  }

  cadastrarTarefa(): void {
    this.service.cadastrar(this.formulario.value.descricao).subscribe({
      next: () => this.router.navigate(['/tarefas/criadas']),
      error: () => this.helper.notificar("Erro", "Não foi possivel cadastrar a tarefa")
    })
  }

  editartarefa(): void {
    const tarefa = { ...this.tarefaEdicao }
    tarefa.descricao = this.formulario.value.descricao
    this.service.atualizar(tarefa).subscribe({
      next: () => {
        this.router.navigate(['/tarefas/criadas'])
        this.edicao = false
      },
      error: () => {
        this.edicao = false
        this.helper.notificar("Erro", "Não foi possivel editar a tarefa")
      }
    })
  }

  cancelarEdicao(): void {
    this.formulario.reset()
    this.edicao = false
  }
}
