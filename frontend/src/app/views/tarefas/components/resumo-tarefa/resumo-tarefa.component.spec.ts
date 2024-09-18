import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoTarefaComponent } from './resumo-tarefa.component';

describe('ResumoTarefaComponent', () => {
  let component: ResumoTarefaComponent;
  let fixture: ComponentFixture<ResumoTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumoTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
