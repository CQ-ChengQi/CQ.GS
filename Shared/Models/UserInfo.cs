using CQ.GS.Shared.EnumModel;

namespace CQ.GS.Shared.Models
{
    public class UserInfo
    {
        public UserInfo() { }

        /// <summary>
        /// 获取或设置 名称 。
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// 获取或设置 性别 。
        /// </summary>
        public Gender Gender { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
