using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Output;
using CQ.GS.Shared.EnumModel;
using Newtonsoft.Json;
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
        public async Task<ApiResultList<UserInfoOutput>?> GetUsers(UserInfoFilter query)
        {
            var result = await _httpClient.PostAsJsonAsync("api/user/query", query);
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var content = await result.Content.ReadAsStringAsync();
                var res = JsonConvert.DeserializeObject<ApiResultList<UserInfoOutput>>(content);
                return res;
            }

            return new ApiResultList<UserInfoOutput>
            {
                Code = ResultCode.Error
            };
        }
    }
}
