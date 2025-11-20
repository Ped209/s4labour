using System.Text.Json.Serialization;

namespace CoreApi.Models.Dto
{
    public class RandomUserPublicDto
    {
        [JsonPropertyName("results")]
        public List<ResultPublic> Results { get; set; } = [];

        [JsonPropertyName("info")]
        public Info? Info { get; set; }
    }

    public class ResultPublic
    {
        [JsonPropertyName("gender")]
        public string? Gender { get; set; }

        [JsonPropertyName("name")]
        public Name? Name { get; set; }

        [JsonPropertyName("location")]
        public Location? Location { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        // Only expose non-sensitive login properties
        [JsonPropertyName("login")]
        public LoginPublic? Login { get; set; }

        [JsonPropertyName("dob")]
        public Dob? Dob { get; set; }

        [JsonPropertyName("registered")]
        public Registered? Registered { get; set; }

        [JsonPropertyName("phone")]
        public string?   Phone { get; set; }

        [JsonPropertyName("cell")]
        public string? Cell { get; set; }

        [JsonPropertyName("id")]
        public Id? Id { get; set; }

        [JsonPropertyName("picture")]
        public Picture? Picture { get; set; }

        [JsonPropertyName("nat")]
        public string? Nat { get; set; }
    }

    public class LoginPublic
    {
        [JsonPropertyName("uuid")]
        public string? Uuid { get; set; }

        [JsonPropertyName("username")]
        public string? Username { get; set; }
    }
}