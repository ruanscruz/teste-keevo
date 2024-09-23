# Desafio Full Stack Developer KEEVO

Neste desafio foi devenvolvida a aplicação web Todolist para o controle de tarefas.

## Sobre a aplicação

A aplicação permite cadastrar, editar, concluir, excluir e filtrar tarefas.

**- Cadastro / Edição**
Input para descrever a tarefa a ser realizada. Ao clicar em editar, a tarefa será exibida no mesmo input, podendo ter seu valor alterado.

**- Exibição das tarefas**
As tarefas serão listadas conforme as categorias:
- **Tarefas criadas**: Exibindo todas as tarefas
- **Tarefas em andamento**: Exibindo somente as tarefas não concluídas
- **Tarefas concluídas**: Exibindo somente as tarefas concluídas

**- Filtro**
Em cada categoria poderá ser realizada o filtro das tarefas.

**- Listagem das tarefas**
- As tarefas listadas terão um input check para marcá-las e desmarcá-las como concluídas;
- A data/horário da criação da tarefa;
- A data/horário da conclusão da tarefa, caso esteja concluída;
- Botões de ações de editar e excluir.

**- Edição das tarefas**
Uma tarefa só poderá ser editada se não estiver concluída. Antes de confirmar a ação, será exibido um botão caso desista de alterá-la;

**- Exclusão das tarefas**
Na ação de exclução, será solicitada confirmação via modal.

## Execução do projeto

- Foi configurado para rodar o build da aplicação via Docker.
- Ao baixar o projeto, será necessário apenas executar o comando `docker-compose up` na raiz do projeto.
- Ao final de todo o processo do build, acessar a aplicação em `http://localhost:8081`
- A documentação da api poderá ser acessada em `http://localhost:5139/swagger/index.html`

## Considerações
Agradeço a oportunidade de desenvolver essa aplicação e espero poder conversar mais sobre ele.


