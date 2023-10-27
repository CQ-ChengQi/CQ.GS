namespace CQ.GS.Shared.Dtos
{
    /// <summary>
    /// 分页基类 。
    /// </summary>
    public class PageInfo
    {
        /// <summary>
        /// 获取或设置 每页显示条数。
        /// </summary>
        public int PageSize { get; set; }


        /// <summary>
        /// 获取或设置 当前页码。
        /// </summary>
        public int PageIndex { get; set; }
    }
}
