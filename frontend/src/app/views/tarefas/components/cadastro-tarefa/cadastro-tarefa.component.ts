import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrls: ['./cadastro-tarefa.component.css']
})
export class CadastroTarefaComponent {
  formulario!: FormGroup;
  tarefaEdicaoSubscribe!: Subscription;
  tarefaEdicao!: Tarefa;
  edicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: TarefasService,
    private router: Router
  ) {
    this.tarefaEdicaoSubscribe = this.service.edicao$.subscribe((tarefa: Tarefa) => {
      this.formulario.setValue({
        descricao: tarefa.descricao
      })
      this.tarefaEdicao = tarefa
      this.edicao = true
      document.getElementById('descricao')?.focus()
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
    this.service.cadastrar(this.formulario.value.descricao).subscribe(() => {
      this.router.navigate(['/tarefas/criadas'])
    })
  }

  editartarefa(): void {
    this.tarefaEdicao.descricao = this.formulario.value.descricao
    this.service.atualizar(this.tarefaEdicao).subscribe(() => {
      this.router.navigate(['/tarefas/andamento'])
      this.edicao = false
    })
  }

  cancelarEdicao(): void {
    this.formulario.reset()
    this.edicao = false
  }
}
