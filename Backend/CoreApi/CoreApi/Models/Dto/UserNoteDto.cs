using System;

namespace CoreApi.Models.Dto
{
    public class UserNoteDto
    {
        public UserNoteDto(string userId, string content)
        {
            UserId = userId;
            Content = content;
        }

        public UserNoteDto(Guid id, string userId, string content, DateTime createdAt)
        {
            Id = id;
            UserId = userId;
            Content = content;
            CreatedAt = createdAt;
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
    }
}