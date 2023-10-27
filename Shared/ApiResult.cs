using CQ.GS.Shared.EnumModel;

namespace CQ.GS.Shared
{
    public class ApiResult<T>
        where T : class, new()
    {

        public ApiResult() { }

        /// <summary>
        /// 获取或设置 返回状态码。
        /// </summary>
        public ResultCode Code { get; set; }

        /// <summary>
        /// 获取或设置 返回消息。
        /// </summary>
        public string? Message { get; set; }


        /// <summary>
        /// 获取或设置 数据。
        /// </summary>
        public T? Data { get; set; }
    }
}
