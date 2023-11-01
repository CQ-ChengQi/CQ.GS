using CQ.GS.Shared.EnumModel;

namespace CQ.GS.Shared.Dtos.Filter
{
    public class UserInfoFilter : PageInfo
    {
        /// <summary>
        /// 获取或设置 用户名。
        /// </summary>
        public string? UserName { get; set; }

        /// <summary>
        /// 获取或设置 名称。
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// 获取或设置 性别。
        /// </summary>
        public Gender? Gender { get; set; }

    }
}
