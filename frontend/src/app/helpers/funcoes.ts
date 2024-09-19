import { ModalConfirmacaoComponent } from './../components/modal-confirmacao/modal-confirmacao.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ModalNotificacaoComponent } from "../components/modal-notificacao/modal-notificacao.component";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FuncoesHelpers {
  constructor(private dialog: MatDialog) { }

  notificar(titulo: string, mensagem: string): void {
    this.dialog.open(ModalNotificacaoComponent, {
      data: { titulo, mensagem }
    });
  }

  confirmarAcao(titulo: string, mensagem: string): MatDialogRef<ModalConfirmacaoComponent> {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      data: { titulo, mensagem, confirmar: true }
    });

    return dialogRef
  }
}
