namespace CQ.GS.Shared
{
    public class User
    {
        public User() { }

        public User(string name, string gender)
        {
            Name = name;
            Gender = gender;
        }

        /// <summary>
        /// 获取或设置 名称 。
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// 获取或设置 性别 。
        /// </summary>
        public string Gender { get; set; } = string.Empty;
    }
}
