namespace CQ.GS.Shared.Dtos
{
    /// <summary>
    /// 分页基类 。
    /// </summary>
    public class PageInfo
    {
        public PageInfo()
        {
            PageSize = 10;
            PageIndex = 1;
        }

        /// <summary>
        /// 获取或设置 每页显示条数。
        /// </summary>
        public int PageSize { get; set; }


        /// <summary>
        /// 获取或设置 当前页码。
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 获取 跳过条目。
        /// </summary>
        public int Skip => (PageIndex == 0 ? 1 : PageIndex - 1) * PageSize;

        /// <summary>
        /// 获取或设置 总条目。
        /// </summary>
        public int Total { get; set; }
    }
}
