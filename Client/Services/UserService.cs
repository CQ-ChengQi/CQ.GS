using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Output;
using System.Net.Http.Json;

namespace CQ.GS.Client.Services
{
    /// <summary>
    /// 用户 Api 服务 。
    /// </summary>
    public class UserService
    {
        private readonly HttpClient _httpClient;

        public UserService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }


        /// <summary>
        /// 获取用户列表 。
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<List<UserInfoOutput>>?> GetUsers(UserInfoFilter query)
        {
            return await _httpClient
                .GetFromJsonAsync<ApiResult<List<UserInfoOutput>>>($"api/User?{query.UserName}");
        }
    }
}
