namespace CQ.GS.Client.Components
{
    public class ReuseTabsPageTitleAttribute : Attribute
    {
        public string Title { get; set; }

        public ReuseTabsPageTitleAttribute(string title)
        {
            Title = title;
        }
    }
}
