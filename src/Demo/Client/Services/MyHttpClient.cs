using CQ.GS.Shared;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Reflection;
using System.Text;

namespace CQ.GS.Client.Services
{
    public class MyHttpClient
    {

        private readonly HttpClient _httpClient;
        private readonly AppSettings _appSettings;

        public MyHttpClient(HttpClient httpClient, AppSettings appSettings)
        {
            _httpClient = httpClient;
            _appSettings = appSettings;
        }

        public async Task<TResult> PostAsync<T, TResult>(string url, T entity)
            where T : class
            where TResult : ApiResultBase, new()
        {
            _appSettings.Loading = true;

            var apiResult = new TResult();
            var result = await _httpClient.PostAsJsonAsync<T>(url, entity);

            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var content = await result.Content.ReadAsStringAsync();

                _appSettings.Loading = false;
                var res = JsonConvert.DeserializeObject<TResult>(content);
                if (res == null)
                {
                    apiResult.Message = "请求返回 Null";
                    return apiResult;
                }
                return res;
            }

            if (result.RequestMessage != null && result.RequestMessage.Content != null)
            {
                apiResult.Message = await result.RequestMessage.Content.ReadAsStringAsync();
            }

            _appSettings.Loading = false;
            return apiResult;
        }

        public async Task<TResult> GetAsync<T, TResult>(string url, T entity)
            where T : new()
             where TResult : ApiResultBase, new()
        {
            _appSettings.Loading = true;

            var apiResult = new TResult();
            var result = await _httpClient.GetFromJsonAsync<TResult>($"{url}?{ConvertToUrl(entity)}");

            if (result == null)
            {
                apiResult.Message = "请求返回 Null";
                _appSettings.Loading = false;
                return apiResult;
            }

            _appSettings.Loading = false;
            return result;
        }


        public async Task<TResult> GetAsync<TResult>(string url)
            where TResult : ApiResultBase, new()
        {
            _appSettings.Loading = true;

            var apiResult = new TResult();
            var result = await _httpClient.GetFromJsonAsync<TResult>($"{url}");

            if (result == null)
            {
                apiResult.Message = "请求返回 Null";
                _appSettings.Loading = false;
                return apiResult;
            }


           _appSettings.Loading = false;

            return result;
        }


        public async Task<TResult> PutAsync<T, TResult>(string url, T entity)
            where T : class
            where TResult : ApiResultBase, new()
        {
            _appSettings.Loading = true;

            var apiResult = new TResult();
            var result = await _httpClient.PutAsJsonAsync<T>(url, entity);

            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var content = await result.Content.ReadAsStringAsync();

                _appSettings.Loading = false;
                var res = JsonConvert.DeserializeObject<TResult>(content);
                if (res == null)
                {
                    apiResult.Message = "请求返回 Null";
                    return apiResult;
                }
                return res;
            }

            if (result.RequestMessage != null && result.RequestMessage.Content != null)
            {
                apiResult.Message = await result.RequestMessage.Content.ReadAsStringAsync();
            }

            _appSettings.Loading = false;
            return apiResult;
        }

        public async Task<TResult> PatchAsync<T, TResult>(string url, T entity)
          where T : class
          where TResult : ApiResultBase, new()
        {
            _appSettings.Loading = true;

            var apiResult = new TResult();
            var result = await _httpClient.PatchAsJsonAsync<T>(url, entity);

            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var content = await result.Content.ReadAsStringAsync();

                _appSettings.Loading = false;
                var res = JsonConvert.DeserializeObject<TResult>(content);
                if (res == null)
                {
                    apiResult.Message = "请求返回 Null";
                    return apiResult;
                }
                return res;
            }

            if (result.RequestMessage != null && result.RequestMessage.Content != null)
            {
                apiResult.Message = await result.RequestMessage.Content.ReadAsStringAsync();
            }

            _appSettings.Loading = false;
            return apiResult;
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
    }
}
