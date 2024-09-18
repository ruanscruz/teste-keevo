import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTarefa'
})
export class StatusTarefaPipe implements PipeTransform {

  transform(status: string, acao: boolean = false): string {
    const statusMap: { [key: string]: { label: string, acao: string } } = {
      "criadas": {
        label: 'criadas',
        acao: 'Crie'
      },
      "andamento": {
        label: 'em andamento',
        acao: 'Crie'
      },
      "concluidas": {
        label: 'concluídas',
        acao: 'Conclua'
      }
    };

    return acao ? statusMap[status]?.acao : statusMap[status]?.label;
  }
}

