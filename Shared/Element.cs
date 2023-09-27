using System.Text.Json.Serialization;

namespace CQ.GS.Shared
{
    public class Element
    {
        public string Group { get; set; } = string.Empty;
        public int Position { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Number { get; set; }

        [JsonPropertyName("small")]
        public string Sign { get; set; } = string.Empty;
        public double Molar { get; set; } = 0.0;
        public IList<int> Electrons { get; set; } = new List<int>();
    }
}
