namespace CQ.GS.Client.Components
{
    public class ReuseTabsPageAttribute : Attribute
    {
        public string Title { get; set; } = string.Empty;

        public bool Ignore { get; set; }

        public bool Closable { get; set; } = true;

        public bool Pin { get; set; } = false;
    }
}
