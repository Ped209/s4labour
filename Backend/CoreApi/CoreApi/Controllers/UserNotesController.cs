using CoreApi.Models.Dto;
using CoreApi.Models.Requests;
using CoreApi.Services.UserNotes;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotesController(IUserNotesService notesService, ILogger<UserNotesController> logger) : ControllerBase
    {
        private readonly IUserNotesService _notesService = notesService;
        private readonly ILogger<UserNotesController> _logger = logger;

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllByUserId(string userId)
        {
            var notes = await _notesService.GetAllByUserIdAsync(userId);
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserNoteRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _notesService.CreateAsync(request);
            // Return Created with the created DTO. Location points to the GetAll endpoint as a simple option.
            return CreatedAtAction(nameof(GetAllByUserId), new { userId = request.UserId }, created);
        }
    }
}