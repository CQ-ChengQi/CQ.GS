using Microsoft.AspNetCore.Components;

namespace CQ.GS.Client.Components
{
    public class ReuseTabsPageItem
    {
        public string Url { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public string Title { get; set; } = string.Empty;

        public RenderFragment Body { get; set; }

        public bool Ignore { get; set; }

        public bool Closable { get; set; } = true;

        public bool Pin { get; set; } = false;
    }
}
