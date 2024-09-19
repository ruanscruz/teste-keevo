import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-notificacao',
  templateUrl: './modal-notificacao.component.html',
  styleUrls: ['./modal-notificacao.component.css']
})
export class ModalNotificacaoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalNotificacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
