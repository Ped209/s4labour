using CoreApi.Infrastructure.ApiClients.Users;
using CoreApi.Models.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IRandomUserApiClient randomUserApiClient, ILogger<UserController> logger) : ControllerBase
    {
        private readonly IRandomUserApiClient _randomUserApiClient = randomUserApiClient;
        private readonly ILogger<UserController> _logger = logger;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _randomUserApiClient.GetUsersAsync();

                if (results is null || results.Results is null || results.Results.Count == 0)
                {
                    return NotFound(new ProblemDetails
                    {
                        Title = "No users",
                        Status = StatusCodes.Status404NotFound,
                        Detail = "Upstream service returned no user data."
                    });
                }

                var publicDto = results.ToPublic();
                return Ok(publicDto);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogWarning(ex, "Upstream HTTP error calling RandomUser API.");
                return StatusCode(StatusCodes.Status503ServiceUnavailable, new ProblemDetails
                {
                    Title = "Upstream service unavailable",
                    Status = StatusCodes.Status503ServiceUnavailable,
                    Detail = "Unable to reach upstream service."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error fetching users.");
                return Problem(detail: "An unexpected error occurred while fetching users.", statusCode: StatusCodes.Status500InternalServerError);
            }
        }
    }
}
