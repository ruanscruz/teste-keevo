using Microsoft.EntityFrameworkCore;
using Todolist.Models;

namespace Todolist.Data;

public class TarefaContext : DbContext
{
    public TarefaContext(DbContextOptions<TarefaContext> options) : base(options)
    {
    }

    public DbSet<Tarefa> Tarefas { get; set; }
}
