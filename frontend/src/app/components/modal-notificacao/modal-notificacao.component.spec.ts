import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotificacaoComponent } from './modal-notificacao.component';

describe('ModalNotificacaoComponent', () => {
  let component: ModalNotificacaoComponent;
  let fixture: ComponentFixture<ModalNotificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNotificacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
