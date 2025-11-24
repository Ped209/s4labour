using CoreApi.Models.Domain;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApi.Infrastructure.Repositories.UserNotes
{
    // Simple thread-safe in-memory repository for temporary storage
    public class InMemoryUserNotesRepository : IUserNotesRepository
    {
        private readonly ConcurrentDictionary<Guid, UserNote> _store = new();

        public Task<IEnumerable<UserNote>> GetAllByUserIdAsync(string userId)
        {
            var all = _store.Values
                .Where(n => n.UserId == userId)
                .OrderBy(n => n.CreatedAt)
                .ToList()
                .AsEnumerable();
            return Task.FromResult(all);
        }

        public Task<UserNote> AddAsync(UserNote note)
        {
            if (note.Id == Guid.Empty) note.Id = Guid.NewGuid();
            note.CreatedAt = note.CreatedAt == default ? DateTime.UtcNow : note.CreatedAt;
            _store[note.Id] = note;
            return Task.FromResult(note);
        }
    }
}