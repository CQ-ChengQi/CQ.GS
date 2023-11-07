using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Input;
using CQ.GS.Shared.Models;

namespace CQ.GS.Server.Services
{
    public interface IUserInfoService
    {
        IEnumerable<UserInfo> GetUserInfoList(UserInfoFilter filter);

        UserInfo? GetUserInfoById(int id);

        Task Add(UserInfoAddInput input);

        Task Update(long id, UserInfoUpdateInput input);
    }
}
