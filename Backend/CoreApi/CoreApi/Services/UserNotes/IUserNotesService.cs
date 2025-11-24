using CoreApi.Models.Dto;
using CoreApi.Models.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreApi.Services.UserNotes
{
    public interface IUserNotesService
    {
        Task<IEnumerable<UserNoteDto>> GetAllByUserIdAsync(string userId);
        Task<UserNoteDto> CreateAsync(CreateUserNoteRequest request);
    }
}