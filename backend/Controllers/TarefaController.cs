using Microsoft.AspNetCore.Mvc;
using Todolist.Data;
using Todolist.Models;

namespace Todolist.Controllers;

[ApiController]
[Route("[controller]")]
public class TarefaController : Controller
{
    private readonly TarefaContext _context;
    public TarefaController(TarefaContext context)
    {
        _context = context;
    }

    private static List<Tarefa> tarefas = new List<Tarefa>();
    private static int id = 1;

    [HttpPost]
    public IActionResult AdicionarTarefa([FromBody] Tarefa tarefa)
    {   
        _context.Tarefas.Add(tarefa);
        _context.SaveChanges();
        return CreatedAtAction(nameof(ObterTarefa), new { id = tarefa.Id }, tarefa);
    }

    [HttpGet]
    public IEnumerable<Tarefa> ListarTarefas([FromQuery] int skip = 0, [FromQuery] int limit = 2)
    {
        return _context.Tarefas.Skip(skip).Take(limit);
    }

    [HttpGet("{id}")]
    public IActionResult ObterTarefa(int id)
    {
        var tarefa = _context.Tarefas.FirstOrDefault(tarefa => tarefa.Id == id);
        return tarefa switch
        {
            null => NotFound("Tarefa nao encontrada"),
            _ => Ok(tarefa)
        };
    }
}
