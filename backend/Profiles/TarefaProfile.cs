using AutoMapper;
using Todolist.Dtos;
using Todolist.Models;

namespace Todolist.Profiles;

public class TarefaProfile : Profile
{
    public TarefaProfile()
    {
        CreateMap<CreateTarefaDto, Tarefa>();
        CreateMap<UpdateTarefaDto, Tarefa>();
        CreateMap<Tarefa, ReadTarefaDto>();
    }
}
