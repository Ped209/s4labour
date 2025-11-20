using CoreApi.Models.Dto;

namespace CoreApi.Models.Extensions
{
    public static class RandomUserDtoExtensions
    {
        public static RandomUserPublicDto? ToPublic(this RandomUserDto source)
        {
            if (source == null) return null;

            return new RandomUserPublicDto
            {
                Info = source.Info,
                Results = source.Results == null
                    ? []
                    : [.. source.Results.Select(r => new ResultPublic
                    {
                        Gender = r.Gender,
                        Name = r.Name,
                        Location = r.Location,
                        Email = r.Email,
                        Login = r.Login == null ? null : new LoginPublic
                        {
                            Uuid = r.Login.Uuid,
                            Username = r.Login.Username
                        },
                        Dob = r.Dob,
                        Registered = r.Registered,
                        Phone = r.Phone,
                        Cell = r.Cell,
                        Id = r.Id,
                        Picture = r.Picture,
                        Nat = r.Nat
                    })]
            };
        }
    }
}
