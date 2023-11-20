using CQ.GS.Shared.Utils.Attributes;

namespace CQ.GS.Shared.EnumModel
{
    public enum Gender
    {

        None = 0,

        [DisplayName("男")]
        Man = 1,

        [DisplayName("女")]
        Girl = 2,

        [DisplayName("其他")]
        Other = 3
    }
}
