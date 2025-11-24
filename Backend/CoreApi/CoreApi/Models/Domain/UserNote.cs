namespace CoreApi.Models.Domain
{
    public class UserNote(string userId, string content)
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Content { get; set; } = content;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; } = userId;
    }
}
