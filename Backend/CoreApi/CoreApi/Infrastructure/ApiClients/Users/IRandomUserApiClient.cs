using CoreApi.Models.Dto;

namespace CoreApi.Infrastructure.ApiClients.Users
{
    public interface IRandomUserApiClient
    {
        Task<RandomUserDto?> GetUsersAsync();
    }
}
