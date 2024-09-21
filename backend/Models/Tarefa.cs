using System.ComponentModel.DataAnnotations;

namespace Todolist.Models
{
    public class Tarefa
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage ="A descrição é obrigatória")]
        public string? Descricao { get; set; }
        [Required(ErrorMessage ="A data de criação é obrigatória")]
        public string? DataCriacao { get; set; }
        public string? DataConclusao { get; set; }
        [Required(ErrorMessage ="A tarefa deve ser concluída ou não")]
        public bool Concluida { get; set; }
    }
}
