using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Todolist.Data;
using Todolist.Dtos;
using Todolist.Models;

namespace Todolist.Controllers;

[ApiController]
[Route("[controller]")]
public class TarefaController : Controller
{
    private readonly TarefaContext _context;
    private readonly IMapper _mapper;
    public TarefaController(TarefaContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IEnumerable<ReadTarefaDto> ListarTarefas([FromQuery] int skip = 0, [FromQuery] int limit = 2)
    {
        return _mapper.Map<List<ReadTarefaDto>>(_context.Tarefas.Skip(skip).Take(limit));
    }

    [HttpGet("{id}")]
    public IActionResult ObterTarefa(int id)
    {
        Tarefa? tarefa = _context.Tarefas.FirstOrDefault(tarefa => tarefa.Id == id);
        if(tarefa == null) return NotFound("Tarefa não encontrada");
        ReadTarefaDto tarefaDto = _mapper.Map<ReadTarefaDto>(tarefa);
        return Ok(tarefaDto);
    }

    [HttpPost]
    public IActionResult AdicionarTarefa([FromBody] CreateTarefaDto tarefaDto)
    {   
        Tarefa tarefa = _mapper.Map<Tarefa>(tarefaDto);
        _context.Tarefas.Add(tarefa);
        _context.SaveChanges();
        return CreatedAtAction(nameof(ObterTarefa), new { id = tarefa.Id }, tarefa);
    }

    [HttpPut("{id}")]
    public IActionResult AtualizarTarefa(int id, [FromBody] UpdateTarefaDto tarefaDto)
    {
        Tarefa? tarefa = _context.Tarefas.FirstOrDefault(tarefa => tarefa.Id == id);
        if (tarefa == null) return NotFound();
        _mapper.Map(tarefaDto, tarefa);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletarTarefa(int id)
    {
        Tarefa? tarefa = _context.Tarefas.FirstOrDefault(tarefa => tarefa.Id == id);
        if (tarefa == null) return NotFound();
        _context.Remove(tarefa);
        _context.SaveChanges();
        return NoContent();
    }
}
