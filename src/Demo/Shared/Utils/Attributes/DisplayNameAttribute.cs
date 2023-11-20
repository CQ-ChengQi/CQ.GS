namespace CQ.GS.Shared.Utils.Attributes
{
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false)]
    public class DisplayNameAttribute : Attribute
    {
        /// <summary>
        /// 获取或设置 显示名称。
        /// </summary>
        public string DisplayName { get; }

        public DisplayNameAttribute(string displayName)
        {
            DisplayName = displayName;
        }
    }
}
