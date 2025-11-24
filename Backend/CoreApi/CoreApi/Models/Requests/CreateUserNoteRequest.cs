using System.ComponentModel.DataAnnotations;

namespace CoreApi.Models.Requests
{
    public class CreateUserNoteRequest
    {
        [Required]
        [MaxLength(2000)]
        public string Content { get; set; } = string.Empty;
        public required string UserId { get; set; }
    }
}