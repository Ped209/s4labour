using CoreApi.Models.Dto;

namespace CoreApi.Infrastructure.ApiClients.Users
{
    public class RandomUserApiClient(HttpClient http) : IRandomUserApiClient
    {
        private readonly HttpClient _http = http;

        public async Task<RandomUserDto?> GetUsersAsync()
        {
            var response = await _http.GetAsync($"/api?seed=s4labour&results=10");
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<RandomUserDto>();
        }
    }
}
