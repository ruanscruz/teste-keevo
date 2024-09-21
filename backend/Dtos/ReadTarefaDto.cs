using System.ComponentModel.DataAnnotations;

namespace Todolist.Dtos;

public class ReadTarefaDto
{   
    public int Id { get; set; }
    public string? Descricao { get; set; }
    public string? DataCriacao { get; set; }
    public string? DataConclusao { get; set; }
    public bool Concluida { get; set; }
}
