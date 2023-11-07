using CQ.GS.Shared.EnumModel;

namespace CQ.GS.Shared
{

    public abstract class ApiResultBase
    {

        public ApiResultBase() { }

        public ApiResultBase(string message)
        {
            this.Message = message;
        }

        /// <summary>
        /// 获取或设置 返回状态码。
        /// </summary>
        public ResultCode Code { get; set; }

        /// <summary>
        /// 获取或设置 返回消息。
        /// </summary>
        public string? Message { get; set; }

        /// <summary>
        /// 是否成功 。
        /// </summary>
        public bool IsSuccess => Code == ResultCode.Success;


    }

    public class ApiResult : ApiResultBase
    {
        public static ApiResult Error => new ApiResult() { Code = ResultCode.Error };

        public static ApiResult Success => new ApiResult() { Code = ResultCode.Success };


    }

    public class ApiResult<T> : ApiResultBase
        where T : class, new()
    {

        /// <summary>
        /// 获取或设置 数据。
        /// </summary>
        public T? Data { get; set; }

        public static ApiResult<T> Error => new ApiResult<T>() { Code = ResultCode.Error };

        public static ApiResult<T> Success => new ApiResult<T>() { Code = ResultCode.Success };
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
        public static ApiResultList<T> Error => new ApiResultList<T>() { Code = ResultCode.Error };

        public static ApiResultList<T> Success => new ApiResultList<T>() { Code = ResultCode.Success };
    }
}
