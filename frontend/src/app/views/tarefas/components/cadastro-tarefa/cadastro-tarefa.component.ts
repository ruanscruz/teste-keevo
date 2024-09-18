import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrls: ['./cadastro-tarefa.component.css']
})
export class CadastroTarefaComponent {
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: TarefasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      descricao: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])]
    })
  }

  cadastrarTarefa(): void {
    if (this.formulario.valid) {
      this.service.cadastrar(this.formulario.value.descricao).subscribe(() => {
        this.router.navigate(['/tarefas/criadas'])
        this.formulario.reset()
      })
    }
  }
}
