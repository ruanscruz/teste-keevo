import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTarefaComponent } from './filtro-tarefa.component';

describe('FiltroTarefaComponent', () => {
  let component: FiltroTarefaComponent;
  let fixture: ComponentFixture<FiltroTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
