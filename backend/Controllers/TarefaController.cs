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

    /// <summary>
    /// Listar as tarefas cadastradas
    /// </summary>
    /// <param name="status">Filtro para listar tarefas por status</param>
    /// <returns>IEnumerable<ReadTarefaDto></returns>
    /// <response code="200">Retorna uma lista de tarefas</response>
    [HttpGet]
    public IEnumerable<ReadTarefaDto> ListarTarefas([FromQuery] string ?status = "")
    {   
        if(status == "")return _mapper.Map<List<ReadTarefaDto>>(_context.Tarefas);

        return _mapper.Map<List<ReadTarefaDto>>(_context.Tarefas.Where(tarefa => tarefa.Status == status));  
    }

    /// <summary>
    /// Buscar uma tarefa
    /// </summary>
    /// <param name="id">Id da tarefa a ser consultada</param>
    /// <returns>IActionResult</returns>
    /// <response code="200">Caso a tarefa seja encontrada com sucesso</response>
    /// <response code="404">Caso a tarefa não seja encontrada</response>
    [HttpGet("{id}")]
    public IActionResult ObterTarefa(int id)
    {
        Tarefa? tarefa = _context.Tarefas.FirstOrDefault(tarefa => tarefa.Id == id);
        if(tarefa == null) return NotFound("Tarefa não encontrada");
        ReadTarefaDto tarefaDto = _mapper.Map<ReadTarefaDto>(tarefa);
        return Ok(tarefaDto);
    }

    /// <summary>
    /// Adiciona uma tarefa
    /// </summary>
    /// <param name="tarefaDto">Objeto com os campos necessários para criação de um tarefa</param>
    /// <returns>IActionResult</returns>
    /// <response code="201">Caso inserção seja feita com sucesso</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public IActionResult AdicionarTarefa([FromBody] CreateTarefaDto tarefaDto)
    {   
        Tarefa tarefa = _mapper.Map<Tarefa>(tarefaDto);
        _context.Tarefas.Add(tarefa);
        _context.SaveChanges();
        return CreatedAtAction(nameof(ObterTarefa), new { id = tarefa.Id }, tarefa);
    }

    /// <summary>
    /// Atualiza uma tarefa
    /// </summary>
    /// <param name="id">Id da tarefa a ser alterada</param>
    /// <param name="tarefaDto">Objeto com os campos necessários para alteração de um tarefa</param>
    /// <returns>IActionResult</returns>
    /// <response code="204">Caso alteração seja feita com sucesso</response>
    /// <response code="404">Caso a tarefa não seja encontrada</response>
    [HttpPut("{id}")]
    public IActionResult AtualizarTarefa(int id, [FromBody] UpdateTarefaDto tarefaDto)
    {
        Tarefa? tarefa = _context.Tarefas.FirstOrDefault(tarefa => tarefa.Id == id);
        if (tarefa == null) return NotFound();
        _mapper.Map(tarefaDto, tarefa);
        _context.SaveChanges();
        return NoContent();
    }

    /// <summary>
    /// Deleta uma tarefa
    /// </summary>
    /// <param name="id">Id da tarefa a ser deletada</param>
    /// <returns>IActionResult</returns>
    /// <response code="204">Caso alteração seja feita com sucesso</response>
    /// <response code="404">Caso a tarefa não seja encontrada</response>
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
