using System.Text.Json;
using System.Text.Json.Serialization;

namespace CoreApi.Infrastructure.Json
{
    public class FlexibleStringConverter : JsonConverter<string>
    {
        public override string Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.String:
                    return reader.GetString() ?? string.Empty;

                case JsonTokenType.Number:
                    // Safely attempt integer first
                    if (reader.TryGetInt64(out long longValue))
                        return longValue.ToString();

                    // Fallback for non-integer numbers
                    if (reader.TryGetDouble(out double doubleValue))
                        return doubleValue.ToString();

                    return string.Empty;

                case JsonTokenType.Null:
                    return string.Empty;

                default:
                    throw new JsonException($"Unexpected token {reader.TokenType} when parsing a string.");
            }
        }

        public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value);
        }
    }
}
