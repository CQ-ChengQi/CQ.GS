using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Input;
using CQ.GS.Shared.Dtos.Output;

namespace CQ.GS.Client.Services
{
    /// <summary>
    /// 用户 Api 服务 。
    /// </summary>
    public class UserService
    {
        private readonly MyHttpClient _httpClient;

        public UserService(MyHttpClient httpClient)
        {
            _httpClient = httpClient;

        }


        public async Task<ApiResultList<UserInfoOutput>> GetUsers(UserInfoFilter query)
        {
            return await _httpClient.GetAsync<UserInfoFilter, ApiResultList<UserInfoOutput>>($"api/user", query);
        }

        public async Task<ApiResult<UserInfoUpdateInput>> GetUserById(long id)
        {
            return await _httpClient.GetAsync<ApiResult<UserInfoUpdateInput>>($"api/user/{id}");
        }

        public async Task<ApiResult> Save(long id, UserInfoUpdateInput input)
        {
            return await _httpClient.PutAsync<UserInfoUpdateInput, ApiResult>($"api/user/{id}", input);

        }

        public async Task<ApiResult> Add(UserInfoAddInput input)
        {
            return await _httpClient.PostAsync<UserInfoAddInput, ApiResult>($"api/user", input);
        }


        public async Task<ApiResult> ModifyStatus(long id, UserInfoAddInput input)
        {
            return await _httpClient.PatchAsync<UserInfoAddInput, ApiResult>($"api/user/{id}", input);
        }
    }
}
