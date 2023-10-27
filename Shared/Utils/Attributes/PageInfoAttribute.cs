namespace CQ.GS.Shared.Utils.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class PageInfoAttribute : Attribute
    {
        public PageInfoAttribute(string title, string desc)
        {
            Title = title;
            Desc = desc;
        }

        public string Title { get; set; }

        public string Desc { get; set; }
    }
}
