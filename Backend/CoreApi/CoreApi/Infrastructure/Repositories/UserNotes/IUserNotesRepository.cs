using CoreApi.Models.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreApi.Infrastructure.Repositories.UserNotes
{
    public interface IUserNotesRepository
    {
        Task<IEnumerable<UserNote>> GetAllByUserIdAsync(string userId);
        Task<UserNote> AddAsync(UserNote note);
    }
}