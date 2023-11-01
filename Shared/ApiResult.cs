using CQ.GS.Shared.EnumModel;

namespace CQ.GS.Shared
{

    public abstract class ApiResultBase
    {

        /// <summary>
        /// 获取或设置 返回状态码。
        /// </summary>
        public ResultCode Code { get; set; }

        /// <summary>
        /// 获取或设置 返回消息。
        /// </summary>
        public string? Message { get; set; }

    }

    public class ApiResult<T> : ApiResultBase
        where T : class, new()
    {

        /// <summary>
        /// 获取或设置 数据。
        /// </summary>
        public T? Data { get; set; }
    }

    public class ApiResultList<T> : ApiResultBase
    {
        /// <summary>
        /// 获取或设置 数据。
        /// </summary>
        public IList<T> Data { get; set; } = Array.Empty<T>();

        /// <summary>
        /// 获取或设置 总条目。
        /// </summary>
        public int Total { get; set; }
    }
}
