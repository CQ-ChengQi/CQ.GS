using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Output;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using System.Reflection;
using System.Text;

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

        private string ConvertToUrl<T>(T obj)
        {
            StringBuilder urlBuilder = new StringBuilder();
            Type type = typeof(T);
            PropertyInfo[] properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var property in properties)
            {
                string propertyName = property.Name;
                object? propertyValue = property.GetValue(obj);
                if (propertyValue != null)
                {

                    // 将属性名和属性值添加到URL参数
                    if (urlBuilder.Length > 0)
                    {
                        urlBuilder.Append("&");
                    }
                    urlBuilder.AppendFormat("{0}={1}", UriDataStringEscape(propertyName), UriDataStringEscape(propertyValue.ToString()));
                }
            }

            return urlBuilder.ToString();
        }

        private string UriDataStringEscape(string? argument)
        {

            if (argument == null)
                return "";

            return Uri.EscapeDataString(argument);
        }


        /// <summary>
        /// 获取用户列表 。
        /// </summary>
        /// <returns></returns>
        //public async Task<ApiResultList<UserInfoOutput>?> GetUsers(UserInfoFilter query)
        //{
        //    var result = await _httpClient.PostAsJsonAsync("api/user/query", query);
        //    if (result.StatusCode == System.Net.HttpStatusCode.OK)
        //    {
        //        var content = await result.Content.ReadAsStringAsync();
        //        var res = JsonConvert.DeserializeObject<ApiResultList<UserInfoOutput>>(content);
        //        return res;
        //    }

        //    return new ApiResultList<UserInfoOutput>
        //    {
        //        Code = ResultCode.Error
        //    };
        //}

        public async Task<ApiResultList<UserInfoOutput>?> GetUsers(UserInfoFilter query)
        {
            return await _httpClient.GetFromJsonAsync<ApiResultList<UserInfoOutput>>($"api/user?{ConvertToUrl(query)}");
        }
    }
}
