using CoreApi.Infrastructure.Repositories.UserNotes;
using CoreApi.Models.Domain;
using CoreApi.Models.Dto;
using CoreApi.Models.Requests;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApi.Services.UserNotes
{
    public class UserNotesService(IUserNotesRepository repository) : IUserNotesService
    {
        public async Task<IEnumerable<UserNoteDto>> GetAllByUserIdAsync(string userId)
        {
            var notes = await repository.GetAllByUserIdAsync(userId);
            return notes.Select(n => new UserNoteDto(n.Id, n.UserId, n.Content, n.CreatedAt)).OrderByDescending(n => n.CreatedAt);
        }

        public async Task<UserNoteDto> CreateAsync(CreateUserNoteRequest request)
        {
            var note = new UserNote(request.UserId, request.Content);

            var created = await repository.AddAsync(note);

            return new UserNoteDto(created.Id, created.UserId, created.Content, created.CreatedAt);
        }
    }
}