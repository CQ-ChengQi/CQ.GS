using CQ.GS.Shared.Utils.Attributes;

namespace CQ.GS.Shared.EnumModel
{
    public enum Gender
    {
        [DisplayName("未知")]
        None = 0,

        [DisplayName("男")]
        Man = 1,

        [DisplayName("女")]
        Girl = 2
    }
}
