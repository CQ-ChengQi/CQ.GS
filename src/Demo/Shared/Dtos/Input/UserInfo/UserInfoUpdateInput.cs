using CQ.GS.Shared.EnumModel;
using System.ComponentModel.DataAnnotations;

namespace CQ.GS.Shared.Dtos.Input
{
    public class UserInfoUpdateInput
    {

        [Required(ErrorMessage = "请输入用户名!")]
        [StringLength(16, ErrorMessage = "用户名长度不能超过 16 !")]
        public string UserName { get; set; } = string.Empty;

        [Required(ErrorMessage = "请输入邮箱!")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "请输入年龄!")]
        [Range(18, 100, ErrorMessage = "年龄范围为 18 - 100 岁")]
        public int Age { get; set; }

        [Required(ErrorMessage = "请选择性别!")]
        [Range(1, 3, ErrorMessage = "请选择性别!")]
        public Gender Gender { get; set; }

        [Required(ErrorMessage = "请输入姓名!")]
        [StringLength(16, ErrorMessage = "姓名长度不能超过 16 !")]
        public string Name { get; set; } = string.Empty;
    }
}
